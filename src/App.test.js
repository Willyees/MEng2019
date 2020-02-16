import React from 'react';
import { render, getAllByText } from '@testing-library/react';
import App from './App';


test('renders learn react link', () => {
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText(/Meal Time/i);//searching for the text Meal Time. (should be everywherer because is on the nav bar)
  expect(linkElement[0]).toBeInTheDocument();
});
