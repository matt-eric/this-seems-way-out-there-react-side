import React from 'react';
import { render } from '@testing-library/react';
import SignInWidget from './SignInWidget';

test('renders learn react link', () => {
  const { getByText } = render(<SignInWidget />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
