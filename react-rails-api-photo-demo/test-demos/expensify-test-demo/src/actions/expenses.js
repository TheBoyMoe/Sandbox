import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// async actions perform an asynchronous action, e.g. write to FB, then update the store in the callback
// async actions use redux-thunk(by default redux actions CANNOT return functions)
// thunk passes 'dispatch' into the return function, which will be used to dispatch the call to the store
export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt };
    // write the expense data to FB 
    // adding return - returns a promise, enabling the action to be tested by chaining on more 'then's
    return database.ref(`users/${uid}/expenses`).push(expense)
      .then(res => {
        // update the redux store
        dispatch(addExpense({
          id: res.key,
          ...expense
        }));
      })
      .catch(err => console.log('Error saving expense to FB', err.message));
  };
};

// SET_EXPENSES - update the store with an array of expenses
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// async action - fetches expenses from fb
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value')
      .then((snapshot) => {
        // iterate over the snapshot obj and create an array of expenses
        const expenses = [];
        snapshot.forEach((obj) => {
          expenses.push({
            id: obj.key,
            ...obj.val()
          });
        });
        // update the store
        dispatch(setExpenses(expenses));
      });
  };
};

// REMOVE_EXPENSE - remove expense from store
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// async action - remove expense from fb, 
// then dispatch the action to update the store
export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${id}`).remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// async action - update expense on fb, then dispatch 
// the action to update the store
export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // by returning a promise we can do 'something' after the async action completes in the test
    return database.ref(`users/${uid}/expenses/${id}`).update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};
