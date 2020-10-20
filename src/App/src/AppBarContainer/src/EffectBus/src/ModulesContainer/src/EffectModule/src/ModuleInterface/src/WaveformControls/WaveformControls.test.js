import React from 'react';
import { render } from '@testing-library/react';
import WaveformControls from './WaveformControls';

test('renders learn react link', () => {
  const { getByText } = render(<WaveformControls />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
