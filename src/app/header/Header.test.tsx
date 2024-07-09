import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Header } from './Header';

test('calls openModal when add contragent button is clicked', () => {
  const openModal = jest.fn();

  const { getByText } = render(<Header openModal={openModal}></Header>);

  fireEvent.click(getByText(/добавить/i));

  expect(openModal).toHaveBeenCalled();
});
