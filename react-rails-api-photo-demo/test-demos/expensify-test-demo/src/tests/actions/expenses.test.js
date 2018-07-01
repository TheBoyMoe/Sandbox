import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import * as expense from '../../actions/expenses';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';


// when using strings, booleans or numbers -> 'toBe
// when comparing objects or arrays -> 'toEqual'

// write some test data to fb
// use 'done' to ensure that the function only returns after the call to fb has completed
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    console.log(createdAt);
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData)
    .then(() => done());
});

// config mockStore passing in the midleware to be used
const createMockStore = configureMockStore([thunk]);

// REMOVE EXPENSE
test('should return a remove expense action object', () => {
  const action = expense.removeExpense({id: '123abc'});
  expect(action).toEqual({type: 'REMOVE_EXPENSE', id: '123abc'});
});

test('should return action object with undefined id, when not supplied', () => {
  const action = expense.removeExpense();
  expect(action).toEqual({type: 'REMOVE_EXPENSE', id: undefined});
});

// EDIT EXPENSE
test('should return an edit expense action object', () => {
  const action = expense.editExpense('123abc', {note: 'New note value'});
  expect(action).toEqual({type: 'EDIT_EXPENSE', id: '123abc', updates: {note: 'New note value'}})
});

// ADD EXPENSE
test('should return add expense object with provided values', () => {
  const action = expense.addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

// test async action
// check that the database is updated, and that the correct action was dispatched
// by passing in 'done', we tell jest that the function is asynchronous, 
// and will not return until 'done()' is called - forces the test suite to wait
test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'buy milk',
    amount: 44,
    note: 'need milk for the cereal',
    createdAt: moment(1000).valueOf()
  };

  // depends on the 'startAddExpense' method returning
  store.dispatch(expense.startAddExpense(expenseData))
    .then(() => {
      // check that the action was correctly dispatched
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      // check that the database was written to, get the id for the expense
      // use it to fetch a snapshot from FB
      // return a promise which will be resolved in the following 'then'
      return database.ref(`expenses/${actions[0].expense.id}`).once('value'); 
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);  
      done();
    });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const obj = {
    description: '', 
    note: '', 
    amount: 0,
    createdAt: 0 
  };

  store.dispatch(expense.startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...obj
        }      
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once('value'); 
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(obj);  
      done();
    });
});

test('should return set expense action object with data', () => {
  const action = expense.setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});

test('should fetch expense from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(expense.startSetExpenses())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      done();
    });
});