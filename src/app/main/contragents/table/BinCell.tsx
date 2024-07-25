import React from 'react';
import bimImage from '../../../images/bin.svg';
import { Contragent } from '../../../types';

interface Props {
  contragent: Contragent;
  onDeleteContragent: (contragent: Contragent) => void;
}

export const BinCell: React.FC<Props> = (props) => (
  <td
    data-testid="bin-cell"
    onClick={(e) => props.onDeleteContragent(props.contragent)}
  >
    <img src={bimImage} alt={'bin'} />
  </td>
);
