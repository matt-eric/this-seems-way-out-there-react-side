import React from 'react';
import { render } from '@testing-library/react';
import Slider from './Slider';

test('renders learn react link', () => {
  const { getByText } = render(<Slider />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
