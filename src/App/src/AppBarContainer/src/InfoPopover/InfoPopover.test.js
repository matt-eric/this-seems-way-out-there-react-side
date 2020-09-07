import React from 'react';
import { render } from '@testing-library/react';
import InfoPopover from './InfoPopover';

test('renders learn react link', () => {
  const { getByText } = render(<InfoPopover />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
