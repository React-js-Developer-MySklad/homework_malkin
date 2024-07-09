import React from 'react';
import { Contragent } from './Contragent';
import { DataCell } from './DataCell';
import { BinCell } from './BinCell';

interface Props {
  contragent: Contragent;
  onDeleteContragent: (contragent: Contragent) => void;
  openModalWithContragent: (contragent: Contragent) => void;
}

export const Row: React.FC<Props> = (props) => (
  <tr
    data-testid="conteragent-row"
    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    onDoubleClick={() => props.openModalWithContragent(props.contragent)}
  >
    <DataCell propertyName="name" data={props.contragent.name}></DataCell>
    <DataCell propertyName="itn" data={props.contragent.itn}></DataCell>
    <DataCell propertyName="address" data={props.contragent.address}></DataCell>
    <DataCell propertyName="trrc" data={props.contragent.trrc}></DataCell>
    <BinCell
      contragent={props.contragent}
      onDeleteContragent={props.onDeleteContragent}
    ></BinCell>
  </tr>
);
