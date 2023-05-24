import React from 'react';
import { FieldError } from 'react-hook-form';

type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  register: any;
  error: FieldError | undefined; // Utiliser le type FieldError
};

const FormField: React.FC<FormFieldProps> = ({ label, type, name, register, error }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...register(name)} />
      {error && <span>{error.message}</span>} {/* Utiliser error.message */}
    </div>
  );
};

export default FormField;
