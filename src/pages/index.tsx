// index.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from '../styles/Home.module.css';
import FormField from './FormField';
import PasswordConfirmationField from './PasswordConfirmationField';

type FormData = {
  nom: string;
  prenom: string;
  motDePasse: string;
  confirmMotDePasse: string;
  email: string;
};

const schema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  motDePasse: yup.string().required('Le mot de passe est requis'),
  confirmMotDePasse: yup
    .string()
    .oneOf([yup.ref('motDePasse')], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est requise'),
  email: yup.string().required("L'email est requis").email("L'email n'est pas valide"),
});

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const password = watch('motDePasse');

  const validatePasswordMatch = (value: string) => {
    return value === password || 'Les mots de passe ne correspondent pas';
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await schema.validate(data, { abortEarly: false });
      console.log('Validation succeeded');
      onSubmit(data);
    } catch (validationErrors: any) {
      const errors = validationErrors.inner.reduce((acc: any, error: any) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      console.log('Validation failed', errors);
    }
  };

  return (
    <form className={styles['registration-form']} onSubmit={handleSubmit(handleFormSubmit)}>
      <FormField label="Pseudo" type="text" name="nom" register={register} error={errors.nom} />
      <FormField label="Email" type="email" name="email" register={register} error={errors.email} />
      <FormField label="Mot de passe" type="password" name="motDePasse" register={register} error={errors.motDePasse} />
      <PasswordConfirmationField
        label="Confirmer le mot de passe"
        name="confirmMotDePasse"
        register={register}
        validatePasswordMatch={validatePasswordMatch}
        error={errors.confirmMotDePasse}
      />

      <input type="submit" value="S'inscrire" />
    </form>
  );
};

export default RegistrationForm;
