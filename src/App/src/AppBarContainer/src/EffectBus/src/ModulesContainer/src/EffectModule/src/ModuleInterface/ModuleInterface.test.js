import React from 'react';
import { render } from '@testing-library/react';
import ModuleInterface from './ModuleInterface';

test('renders learn react link', () => {
  const { getByText } = render(<ModuleInterface />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
