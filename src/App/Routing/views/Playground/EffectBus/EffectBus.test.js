import React from 'react';
import { render } from '@testing-library/react';
import EffectBus from './EffectBus';

test('renders learn react link', () => {
  const { getByText } = render(<EffectBus />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
