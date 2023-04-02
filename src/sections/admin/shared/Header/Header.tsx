import { Box, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import AdminMenu from '../Menu';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <Box
      as="header"
      paddingTop={'3'}
      paddingBottom={'3'}
      textAlign={'left'}
      display="flex"
      alignItems={'center'}
      justifyContent={'space-between'}
      marginBottom={'5'}
    >
      <Box display="flex" alignItems={'center'} gap={'5'}>
        <AdminMenu />
        <Link as={NextLink} href="/admin" _hover={{ textDecoration: 'none' }}>
          <Heading
            fontSize={'large'}
            color={'gray.900'}
            textDecoration={'none'}
          >
            {title}
          </Heading>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
