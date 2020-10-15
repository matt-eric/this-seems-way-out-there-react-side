import React from 'react';
import { render } from '@testing-library/react';
import EffectModule from './EffectModule';

test('renders learn react link', () => {
  const { getByText } = render(<EffectModule />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
