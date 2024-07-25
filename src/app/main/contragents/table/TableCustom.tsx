import React from 'react';
import '../../main.css';
import { Contragent } from './Contragent';
import { Row } from './Row';

interface Props {
  data: Contragent[];
  onDeleteContragent: (contragent: Contragent) => void;
  openModalWithContragent: (contragent: Contragent) => void;
}

export const TableCustom: React.FC<Props> = (props) => (
  <main>
    <div className="table-content relative overflow-x-auto py-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-400 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-gray-500">
            <th scope="col" className="px-6 py-3">
              Наименование
            </th>
            <th scope="col" className="px-6 py-3">
              ИНН
            </th>
            <th scope="col" className="px-6 py-3">
              Адрес
            </th>
            <th scope="col" className="px-6 py-3">
              КПП
            </th>
          </tr>
        </thead>
        <tbody className="conteragent-table">
          {props.data.map((contragent) => (
            <Row
              key={contragent.id}
              contragent={contragent}
              onDeleteContragent={props.onDeleteContragent}
              openModalWithContragent={props.openModalWithContragent}
            ></Row>
          ))}
        </tbody>
      </table>
    </div>
  </main>
);
