import RegisterForm from '@/components/Form/RegisterForm';

export const metadata = {
  title: 'Register | Recondition Hub',
  description:
    'Sign up to Recondition Hub and start selling your reconditioned vehicles today. Join our platform to reach more customers and grow your business with ease.',
  openGraph: {
    title: 'Register | Recondition Hub',
    description:
      'Create an account on Recondition Hub to list your reconditioned vehicles and start connecting with buyers. Sign up today to grow your business and manage your sales.',
    url: 'https://reconditionhub.com/register',
    images: [
      {
        url: '/assets/register.png',
        width: 1200,
        height: 630,
        alt: 'Register on Recondition Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
