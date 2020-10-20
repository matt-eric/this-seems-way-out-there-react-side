import React from 'react';
import { render } from '@testing-library/react';
import AuthenticationDialog from './AuthenticationDialog';

test('renders learn react link', () => {
  const { getByText } = render(<AuthenticationDialog />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
