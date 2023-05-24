// index.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from '../styles/Home.module.css';
import FormField from './FormField';
import PasswordConfirmationField from './PasswordConfirmationField';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Profile from './Profile';


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

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push({
      pathname: '/profile',
      query: { data: JSON.stringify(data) }, // Passer les données sous forme de chaîne JSON dans les paramètres de requête
    });
  };

  const password = watch('motDePasse');

  const validatePasswordMatch = (value: string) => {
    return value === password || 'Les mots de passe ne correspondent pas';
  };

  const handleFormSubmit = async (data: FormData) => {
    // ...
  
    try {
      // Validation succeeded
      await schema.validate(data, { abortEarly: false });
      console.log('Validation succeeded');
      router.push(`/profile?nom=${data.nom}&prenom=${data.prenom}&email=${data.email}`);
    } catch (validationErrors: any) {
      // ...
    }
  };
  

  return (
    <form className={styles['registration-form']} onSubmit={handleSubmit(handleFormSubmit)}>
      <FormField label="Pseudo" type="text" name="nom" register={register} error={errors.nom} />
      <FormField label="Prénom" type="text" name="prenom" register={register} error={errors.prenom} />
      <FormField label="Email" type="email" name="email" register={register} error={errors.email} />
      <FormField label="Mot de passe" type="password" name="motDePasse" register={register} error={errors.motDePasse} />

      <PasswordConfirmationField
        label="Confirmer le mot de passe"
        name="confirmMotDePasse"
        register={register}
        validatePasswordMatch={validatePasswordMatch}
        error={errors.confirmMotDePasse}
      />

      <div>
        <input type="submit" value="S'inscrire" />
        <button type="button">
          <Link href="/login">Se connecter</Link>
        </button>
      </div>
    </form>
      
      );
      
      

};

export default RegistrationForm;
