import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Title', () => {
  render(<App />);
  const titleElement = screen.getByText(/trello2notion/i);
  expect(titleElement).toBeInTheDocument();
});

test('contains footer with copyright notice', () => {
  render(<App/>);
  const copyrightElement = screen.getByText(/Copyright/i);
  expect(copyrightElement).toBeInTheDocument();
})