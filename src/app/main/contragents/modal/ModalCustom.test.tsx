import { fireEvent, render } from '@testing-library/react';
import { ModalCustom } from './ModalCustom';
import React from 'react';
import '@testing-library/jest-dom';
import { Contragent } from '../table/Contragent';

describe("ModalCustom", () => {
  it('renders with form', () => {
    const handleClose = jest.fn();
    const handleSave = jest.fn();

    const { getByLabelText } = render(
        <ModalCustom
            selectedContragent={undefined}
            closeModal={handleClose}
            onSave={handleSave}
            opened={true}
        ></ModalCustom>
    );

    expect(getByLabelText(/Наименование/i)).toBeInTheDocument();
    expect(getByLabelText(/КПП/i)).toBeInTheDocument();
    expect(getByLabelText(/Адрес/i)).toBeInTheDocument();
    expect(getByLabelText(/ИНН/i)).toBeInTheDocument();
  });

  it('calls onSave when form is submitted', () => {
    const handleClose = jest.fn();
    const handleSave = jest.fn();

    const { getByLabelText, getByText } = render(
        <ModalCustom
            selectedContragent={undefined}
            closeModal={handleClose}
            onSave={handleSave}
            opened={true}
        ></ModalCustom>
    );

    const nameInput = getByLabelText(/Наименование/i);
    const itnInput = getByLabelText(/ИНН/i);
    const addressInput = getByLabelText(/Адрес/i);
    const trrcInput = getByLabelText(/КПП/i);
    const submitButton = getByText(/Сохранить/i);

    fireEvent.change(nameInput, { target: { value: 'Michael' } });
    fireEvent.change(itnInput, { target: { value: '11111' } });
    fireEvent.change(addressInput, { target: { value: 'ул. Колотушкина' } });
    fireEvent.change(trrcInput, { target: { value: '22222' } });
    fireEvent.click(submitButton);

    expect(handleSave).toHaveBeenNthCalledWith(
        1,
        new Contragent(undefined, 'Michael', '11111', 'ул. Колотушкина', '22222')
    );
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
    const selectedContragent = new Contragent(
        100,
        'Pavel',
        '11111',
        'ул. Колотушкина',
        '22222'
    );

    const { getByLabelText } = render(
        <ModalCustom
            selectedContragent={selectedContragent}
            closeModal={handleClose}
            onSave={handleSave}
            opened={true}
        ></ModalCustom>
    );

    const nameInput = getByLabelText(/Наименование/i) as HTMLInputElement;
    const itnInput = getByLabelText(/ИНН/i) as HTMLInputElement;
    const addressInput = getByLabelText(/Адрес/i) as HTMLInputElement;
    const trrcInput = getByLabelText(/КПП/i) as HTMLInputElement;

    expect(nameInput.value).toBe(selectedContragent.name);
    expect(itnInput.value).toBe(selectedContragent.itn);
    expect(addressInput.value).toBe(selectedContragent.address);
    expect(trrcInput.value).toBe(selectedContragent.trrc);
  });
})
