import LogInForm from '@/components/Form/LoginForm';

export const metadata = {
  title: 'Login | Recondition Hub',
  description:
    'Sign up to Recondition Hub and start selling your reconditioned vehicles today. Join our platform to reach more customers and grow your business with ease.',
  openGraph: {
    title: 'Login | Recondition Hub',
    description:
      'Create an account on Recondition Hub to list your reconditioned vehicles and start connecting with buyers. Sign up today to grow your business and manage your sales.',
    url: 'https://reconditionhub.com/login',
    images: [
      {
        url: '/assets/register.png',
        width: 1200,
        height: 630,
        alt: 'Login on Recondition Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const LoginPage = () => {
  return <LogInForm />;
};

export default LoginPage;
