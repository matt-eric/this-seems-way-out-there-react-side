import React from 'react';
import { render } from '@testing-library/react';
import OptionsInterface from './OptionsInterface';

test('renders learn react link', () => {
  const { getByText } = render(<OptionsInterface />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
