import React from 'react';
import { render } from '@testing-library/react';
import VisualizationContainer from './VisualizationContainer';

test('renders learn react link', () => {
  const { getByText } = render(<VisualizationContainer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
