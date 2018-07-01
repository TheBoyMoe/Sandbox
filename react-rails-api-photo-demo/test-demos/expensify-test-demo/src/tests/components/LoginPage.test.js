import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should correctly render LoginPage', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogin when clicking on Login button', () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage login={startLogin} />);
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});