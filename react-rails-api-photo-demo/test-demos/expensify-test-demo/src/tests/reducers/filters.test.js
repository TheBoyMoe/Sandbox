import moment from 'moment';

import filtersReducer from '../../reducers/filters';

// ensure the reducer is setup with the defaults
// we can use @@INIT action dispatched by react
test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  // expect(state).toEqual({
  //   text: '',
  //   sortBy: 'amount',
  //   startDate: moment().startOf('month'),
  //   endDate: moment().endOf('month'),
  // });

  // another implementation
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  // pass in a state object to make sure 'sortBy is changed by reducer
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

// should set text filter
test('should set text filter', () => {
  const action = { type: 'SET_TEXT_FILTER', text: 'Rent'};
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('Rent');
});


// should set startDate filter
test('should set start date', () => {
  const action = { type: 'SET_START_DATE', startDate: moment(0).add(1, 'days').valueOf()};
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(moment(0).add(1, 'days').valueOf());
});

// should set endDate filter
test('should set endDate filter', () => {
  const action = { type: 'SET_END_DATE', endDate: moment(0).add(2, 'days').valueOf() };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(moment(0).add(2, 'days').valueOf());
});


