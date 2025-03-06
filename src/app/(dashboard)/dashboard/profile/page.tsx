import ProfileForm from '@/components/Form/ProfileForm';

export const metadata = {
  title: 'Profile | Recondition Hub',
  description:
    'Manage your listings, view analytics, and track your performance as a seller on Recondition Hub. Access all the tools you need to grow your business and connect with potential buyers.',
  openGraph: {
    title: 'Profile | Recondition Hub',
    description:
      'Manage your listings, view analytics, and track your performance as a seller on Recondition Hub. Access all the tools you need to grow your business and connect with potential buyers.',
  },
};

const ProfilePage = () => {
  return (
    <>
      <ProfileForm />
    </>
  );
};

export default ProfilePage;
