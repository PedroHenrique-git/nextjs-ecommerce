import { Container } from '@chakra-ui/react';
import Header from '@components/sections/admin/Header';
import { useRouter } from 'next/router';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter();

  const isLoginPage = asPath.includes('/admin/login');

  return (
    <Container maxW="1080px">
      {isLoginPage ? null : <Header title="Ecommerce admin" />}
      {children}
    </Container>
  );
};
