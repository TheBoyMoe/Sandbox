import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// async actions perform an asynchronous action, e.g. write to FB, then update the store in the callback
// async actions use redux-thunk(by default redux actions CANNOT return functions)
// thunk passes 'dispatch' into the return function, which will be used to dispatch the call to the store
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt };
    // write the expense data to FB
    database.ref('expenses').push(expense)
      .then(res => {
        // update the redux store
        dispatch(addExpense({
          id: res.id,
          ...expense
        }));
      })
      .catch(err => console.log('Error saving expense to FB', err.message));
  };
};
