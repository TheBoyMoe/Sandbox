import moment from 'moment';

import * as filters from '../../actions/filters';

// SET START DATE
test('should return a set start date filter object', () => {
  const action = filters.setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

// SET END DATE
test('should return a set end date action object', () => {
  const action = filters.setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

// SORT BY AMOUNT
test('should return a sort by amount action object', () => {
  // const action = filters.sortByAmount();
  // expect(action).toEqual({ type: 'SORT_BY_AMOUNT' });

  // different implementation
  expect(filters.sortByAmount()).toEqual({type: 'SORT_BY_AMOUNT'});
});

// SORT BY DATE
test('should return a sort by amount action object', () => {
  // const action = filters.sortByDate();
  // expect(action).toEqual({ type: 'SORT_BY_DATE' });

  expect(filters.sortByDate()).toEqual({type: 'SORT_BY_DATE'});
});

test('should return set text filter action object with provided values', () => {
  const action = filters.setTextFilter('Rent');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'Rent'
  });
});

test('should return set text filter action object with default values', () => {
  const action = filters.setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});
