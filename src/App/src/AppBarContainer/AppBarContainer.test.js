import React from 'react';
import { render } from '@testing-library/react';
import AppBar from './AppBar';

test('renders learn react link', () => {
  const { getByText } = render(<AppBar />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
