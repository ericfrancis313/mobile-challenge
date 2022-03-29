import React from 'react';
import  renderer  from 'react-test-renderer';
import App from '../App';
//running into "fetch is not defined error in App.js"
test('renders correctly', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
});