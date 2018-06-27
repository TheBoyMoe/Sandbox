import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header component', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  // console.log(renderer.getRenderOutput()); // DEBUG
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});