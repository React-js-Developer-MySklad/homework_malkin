import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Row } from './Row';
import { Contragent } from './Contragent';

describe('Row', () => {
  it('calls openModalWithContragent with specific conteragent after double click event on row', () => {
    const openModalWithContragent = jest.fn();
    const onDeleteContragent = jest.fn();
    const expectedContragent = new Contragent(
      undefined,
      'Pavel',
      '111',
      'ddsad',
      '222'
    );

    const { getByTestId } = render(
      <Row
        openModalWithContragent={openModalWithContragent}
        contragent={expectedContragent}
        onDeleteContragent={onDeleteContragent}
      ></Row>
    );

    fireEvent.doubleClick(getByTestId('conteragent-row'));

    expect(openModalWithContragent).toHaveBeenNthCalledWith(
      1,
      expectedContragent
    );
  });

  it('calls onDeleteContragent when bin cell is clicked', () => {
    const openModalWithContragent = jest.fn();
    const onDeleteContragent = jest.fn();

    const { getByTestId } = render(
      <Row
        openModalWithContragent={openModalWithContragent}
        contragent={Contragent.emptyContragent()}
        onDeleteContragent={onDeleteContragent}
      ></Row>
    );

    fireEvent.click(getByTestId('bin-cell'));

    expect(onDeleteContragent).toHaveBeenCalled();
  });

  it("should be filled with provided conteragent's fields", () => {
    const openModalWithContragent = jest.fn();
    const onDeleteContragent = jest.fn();

    const expectedContragent = new Contragent(
      undefined,
      'Pavel',
      '111',
      'ddsad',
      '222'
    );

    const { getByTestId } = render(
      <Row
        openModalWithContragent={openModalWithContragent}
        contragent={expectedContragent}
        onDeleteContragent={onDeleteContragent}
      ></Row>
    );

    expect(getByTestId('name').textContent).toBe(expectedContragent.name);
    expect(getByTestId('itn').textContent).toBe(expectedContragent.itn);
    expect(getByTestId('address').textContent).toBe(expectedContragent.address);
    expect(getByTestId('trrc').textContent).toBe(expectedContragent.trrc);
  });
});
