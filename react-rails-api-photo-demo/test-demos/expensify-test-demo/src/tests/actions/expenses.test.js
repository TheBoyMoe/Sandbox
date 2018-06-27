import * as expense from '../../actions/expenses';

// when using strings, booleans or numbers -> 'toBe
// when comparing objects or arrays -> 'toEqual'

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
  const expenseData = {
    description: 'Rent',
    amount: 451200,
    createdAt: 3000,
    note: 'This months rent'
  };
  const action = expense.addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should return add expense action object with some provided values and default values', () => {
  const expenseData = { description: 'Gas', note: 'This months gas bill'};
  const action = expense.addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});

test('should return add expense action object with default values when no values are provided', () => {
  const action = expense.addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
});