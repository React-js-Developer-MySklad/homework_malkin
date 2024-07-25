import React from 'react';

interface Props {
  propertyName: string;
  data: any;
}

export const DataCell: React.FC<Props> = (props) => (
  <td
    data-testid={props.propertyName}
    className="px-6 py-4 font-semibold text-gray-900"
  >
    {props.data}
  </td>
);
