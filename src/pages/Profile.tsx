import { useRouter } from 'next/router';

const Profile: React.FC = () => {
  const router = useRouter();
  const { data } = router.query;

  // Vérifier si data est un tableau
  const formData = Array.isArray(data) ? JSON.parse(data[0]) : JSON.parse(data || '');

  return (
    <div>
      <h1>Profil</h1>
      <p>Nom: {formData.nom}</p>
      <p>Prénom: {formData.prenom}</p>
      <p>Email: {formData.email}</p>
    </div>
  );
};

export default Profile;
