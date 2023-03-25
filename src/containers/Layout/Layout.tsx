import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Header from 'src/sections/admin/shared/Header';

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
