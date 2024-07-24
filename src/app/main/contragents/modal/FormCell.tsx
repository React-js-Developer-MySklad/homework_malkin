import React from 'react';
import { Label, TextInput, TextInputProps } from 'flowbite-react';
import { useField } from 'react-final-form';

interface Props extends TextInputProps {
  name: string;
  label: string;
}

export const FormCell: React.FC<Props> = ({ name, label, ...rest }) => {
  const {
    input,
    meta: { touched, error },
  } = useField(name);

  return (
    <div className="px-2 py-1 space-y-1">
      <Label className="text-md" data-testid={name} htmlFor={name}>
        {label}
      </Label>
      <TextInput {...input} {...rest} required data-testid={`input-${name}`} />
      {touched && error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  );
};
