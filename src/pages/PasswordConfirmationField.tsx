// PasswordConfirmationField.tsx
import React from 'react';

type PasswordConfirmationFieldProps = {
  label: string;
  name: string;
  register: any;
  validatePasswordMatch: (value: string) => string | boolean;
  error: any;
};

const PasswordConfirmationField: React.FC<PasswordConfirmationFieldProps> = ({ label, name, register, validatePasswordMatch, error }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="password" {...register(name, { validate: validatePasswordMatch })} />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default PasswordConfirmationField;
