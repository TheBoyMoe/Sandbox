import React from 'react';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { Header } from '../../components/Header';

test('should render Header component', () => {
  const wrapper = shallow(<Header />);
  // expect(wrapper.find('h1').length).toBe(1);
  // expect(wrapper.find('h1').text()).toBe('Expensify');
  // expect(toJSON(wrapper)).toMatchSnapshot(); // loaded via jest.config.js file
  expect(wrapper).toMatchSnapshot();

  // shallow render using react renderer
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should call startLogout when clicking on Logout button', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header logout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
