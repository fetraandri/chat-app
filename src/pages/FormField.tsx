// FormField.tsx
import React from 'react';

type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  register: any;
  error: any;
};

const FormField: React.FC<FormFieldProps> = ({ label, type, name, register, error }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...register(name)} />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default FormField;
