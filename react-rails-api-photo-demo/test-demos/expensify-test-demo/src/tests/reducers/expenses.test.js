import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

const defaultState = [];

test('should set default state', () => {
  const action = { type: '@@INIT'};
  expect(expensesReducer(undefined, action)).toEqual(defaultState);
});

test('should remove expense by id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id};
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id is not found', () => {
  const action = { type: 'REMOVE_EXPENSE', id: '-1'};
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = { id: 4, descrtion: 'Gas', note: '', amount: 234500, createdAt: undefined };
  const action = { type: 'ADD_EXPENSE', expense: expense};
  expect(expensesReducer(expenses, action)).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
  const action = { type: 'EDIT_EXPENSE', id: expenses[0].id, updates: { amount: 124000 }};
  expect(expensesReducer(expenses, action)[0].amount).toBe(124000);
});

test('should not edit an expense if the id is not found', () => {
  const action = { type: 'EDIT_EXPENSE', id: '-1', updates: { amount: 124000 }};
  expect(expensesReducer(expenses, action)).toEqual(expenses);
});