import React from 'react';
import { render } from '@testing-library/react';
import Metronome from './Metronome';

test('renders learn react link', () => {
  const { getByText } = render(<Metronome />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
