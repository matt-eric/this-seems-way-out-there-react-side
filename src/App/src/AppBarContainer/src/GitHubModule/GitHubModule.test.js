import React from 'react';
import { render } from '@testing-library/react';
import GitHubModule from './GitHubModule';

test('renders learn react link', () => {
  const { getByText } = render(<GitHubModule />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
