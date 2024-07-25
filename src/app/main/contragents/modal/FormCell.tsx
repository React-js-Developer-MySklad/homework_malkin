import React from 'react';
import { Label, TextInput } from 'flowbite-react';

interface Props {
  type: string;
  propertyName: string;
  labelName: string;
  placeholder: string;
  value?: string;
  setProperty: (property: string) => void;
}

export const FormCell: React.FC<Props> = (props) => {
  return (
    <div className="px-2 py-1 space-y-1">
      <Label className="text-md" htmlFor={props.propertyName}>
        {props.labelName}
      </Label>
      <TextInput
        id={props.propertyName}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.setProperty(event.target.value)}
        required
      />
    </div>
  );
};
