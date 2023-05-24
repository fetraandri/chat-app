import React from 'react';
import { FieldError } from 'react-hook-form';

type PasswordConfirmationFieldProps = {
  label: string;
  name: string;
  register: any;
  validatePasswordMatch: (value: string) => string | boolean;
  error: FieldError | undefined; // Utiliser le type FieldError
};

const PasswordConfirmationField: React.FC<PasswordConfirmationFieldProps> = ({ label, name, register, validatePasswordMatch, error }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="password" {...register(name, { validate: validatePasswordMatch })} />
      {error && <span>{error.message}</span>} {/* Utiliser error.message */}
    </div>
  );
};

export default PasswordConfirmationField;
