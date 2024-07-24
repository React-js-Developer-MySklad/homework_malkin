import {fireEvent, getByTestId, render} from '@testing-library/react';
import { ModalCustom } from './ModalCustom';
import React from 'react';
import '@testing-library/jest-dom';
import { Contragent } from '../../../types';

describe('ModalCustom', () => {
  it('renders with form', () => {
    const handleClose = jest.fn();
    const handleSave = jest.fn();

    const { getByTestId } = render(
      <ModalCustom
        selectedContragent={undefined}
        closeModal={handleClose}
        onSave={handleSave}
        opened={true}
      ></ModalCustom>
    );

    expect(getByTestId('name')).toBeInTheDocument();
    expect(getByTestId('trrc')).toBeInTheDocument();
    expect(getByTestId('address')).toBeInTheDocument();
    expect(getByTestId('itn')).toBeInTheDocument();
  });

  it('calls onSave when form is submitted with valid data', () => {
    const handleClose = jest.fn();
    const handleSave = jest.fn();

    const { getByTestId, getByText } = render(
      <ModalCustom
        selectedContragent={undefined}
        closeModal={handleClose}
        onSave={handleSave}
        opened={true}
      ></ModalCustom>
    );

    const nameInput = getByTestId(/input-name/i);
    const itnInput = getByTestId(/input-itn/i);
    const addressInput = getByTestId(/input-address/i);
    const trrcInput = getByTestId(/input-trrc/i);
    const submitButton = getByText(/Сохранить/i);

    fireEvent.change(nameInput, { target: { value: 'Michael' } });
    fireEvent.change(itnInput, { target: { value: '11111111111' } });
    fireEvent.change(addressInput, { target: { value: 'ул. Колотушкина' } });
    fireEvent.change(trrcInput, { target: { value: '222222222' } });
    fireEvent.click(submitButton);

    const expectedContragent: Contragent = {
      id: undefined,
      name: 'Michael',
      itn: '11111111111',
      address: 'ул. Колотушкина',
      trrc: '222222222',
    };

    expect(handleSave).toHaveBeenNthCalledWith(1, expectedContragent);
  });

  it('does not call onSave when form has invalid data', () => {
    const handleOpen = jest.fn();
    const handleClose = jest.fn();
    const handleSave = jest.fn();

    const { getByTestId, getByText } = render(
        <ModalCustom
            selectedContragent={null}
            openModal={handleOpen}
            closeModal={handleClose}
            onSave={handleSave}
            opened={true}
        ></ModalCustom>
    );

    const nameInput = getByTestId(/input-name/i);
    const itnInput = getByTestId(/input-itn/i);
    const addressInput = getByTestId(/input-address/i);
    const trrcInput = getByTestId(/input-trrc/i);
    const submitButton = getByText(/Сохранить/i);

    fireEvent.change(nameInput, { target: { value: 'Michael' } });
    fireEvent.change(itnInput, { target: { value: '11' } }); // должно состоять из 11 цифр
    fireEvent.change(addressInput, { target: { value: 'ул. Колотушкина' } });
    fireEvent.change(trrcInput, { target: { value: '22' } }); // должно состоять из 9 цифр
    fireEvent.click(submitButton);

    expect(handleSave).toHaveBeenCalledTimes(0);
  });

  it('calls closeModal when close buttons are clicked', () => {
    const handleClose = jest.fn();
    const handleSave = jest.fn();

    const { getByText } = render(
      <ModalCustom
        selectedContragent={undefined}
        closeModal={handleClose}
        onSave={handleSave}
        opened={true}
      ></ModalCustom>
    );

    const closeButton = getByText(/отменить/i);

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });

  it('opens with prefilled form if contragent was provided', () => {
    const handleClose = jest.fn();
    const handleSave = jest.fn();
    const selectedContragent = {
      id: 100,
      name: 'Pavel',
      itn: '11111',
      address: 'ул. Колотушкина',
      trrc: '22222',
    };

    const { getByTestId } = render(
      <ModalCustom
        selectedContragent={selectedContragent}
        closeModal={handleClose}
        onSave={handleSave}
        opened={true}
      ></ModalCustom>
    );

    const nameInput = getByTestId(/input-name/i) as HTMLInputElement;
    const itnInput = getByTestId(/input-itn/i) as HTMLInputElement;
    const addressInput = getByTestId(/input-address/i) as HTMLInputElement;
    const trrcInput = getByTestId(/input-trrc/i) as HTMLInputElement;

    expect(nameInput.value).toBe(selectedContragent.name);
    expect(itnInput.value).toBe(selectedContragent.itn);
    expect(addressInput.value).toBe(selectedContragent.address);
    expect(trrcInput.value).toBe(selectedContragent.trrc);
  });
});
