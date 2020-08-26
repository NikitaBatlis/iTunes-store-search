import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test("First snapshot test", () => {
  const component = renderer.create(<App />);
  console.error(component);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
