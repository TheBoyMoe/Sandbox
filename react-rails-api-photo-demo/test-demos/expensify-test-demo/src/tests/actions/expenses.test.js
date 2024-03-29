import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import * as expense from '../../actions/expenses';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';


// when using strings, booleans or numbers -> 'toBe
// when comparing objects or arrays -> 'toEqual'

// config mockStore passing in the midleware to be used
const createMockStore = configureMockStore([thunk]);
const uid = '123abc';

// write some test data to fb
// use 'done' to ensure that the function only returns after the call to fb has completed
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData)
    .then(() => done());
});


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

// SET_EXPENSES
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

// TEST ASYNC ACTIONS
// by passing in 'done', we tell jest that the function is asynchronous, 
// and will not return until 'done()' is called - forces the test suite to wait
test('should add expense to database and store', (done) => {
  // check that the database is updated, and that the correct action was dispatched
  const store = createMockStore({ auth: {uid}});
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
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); 
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);  
      done();
    });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({auth: {uid}});
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
      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); 
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(obj);  
      done();
    });
});

test('should fetch expense from firebase', (done) => {
  const store = createMockStore({auth: {uid}});
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

test('should remove expense from firebase', (done) => {
  const store = createMockStore({auth: {uid}});
  const id = expenses[2].id;
  store.dispatch(expense.startRemoveExpense({ id  }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('should edit expense on firebase', (done) => {
  // once startEditExpense completes, check that the correct action
  // was dispatched to the store and that the expense on fb was correctly updated
  const store = createMockStore({auth: {uid}});
  const id = expenses[0].id;
  const updates = { amount: 4578 };
  store.dispatch(expense.startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});