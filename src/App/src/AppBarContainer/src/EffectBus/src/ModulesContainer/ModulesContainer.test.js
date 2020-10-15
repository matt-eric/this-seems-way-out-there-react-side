import React from 'react';
import { render } from '@testing-library/react';
import ModulesContainer from './ModulesContainer';

test('renders learn react link', () => {
  const { getByText } = render(<ModulesContainer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
