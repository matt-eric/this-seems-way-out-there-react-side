import React from 'react';
import { render } from '@testing-library/react';
import ModuleContainer from './ModuleContainer';

test('renders learn react link', () => {
  const { getByText } = render(<ModuleContainer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
