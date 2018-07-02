import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { firebase } from './firebase/firebase';

// import { setTextFilter } from './actions/filters';
// import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize'; // REQUIRED for react-with-styles
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

// store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  ReactDOM.render(jsx, document.getElementById('app'));
  hasRendered = true;
};

// check authentication status
firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch(startSetExpenses())
      .then(() => {
        renderApp();
        if(history.location.pathname === '/')
          history.push('/dashboard');
      });
  } else {
    renderApp();
    history.push('/');
  }
});

ReactDOM.render(<p>Loading expenses from server...</p>, document.getElementById('app'));