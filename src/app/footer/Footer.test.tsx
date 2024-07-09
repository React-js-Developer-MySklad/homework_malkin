import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

test('renders footer correctly', () => {
  const { getByText } = render(<Footer></Footer>);
  expect(getByText('© 2007–2024 ООО «Логнекс»')).toBeInTheDocument();
});
