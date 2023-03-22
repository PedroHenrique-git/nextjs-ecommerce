import { Box, Heading } from '@chakra-ui/react';
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
      marginBottom={'5'}
      gap={'5'}
    >
      <AdminMenu />
      <Heading fontSize={'large'} color={'gray.900'}>
        {title}
      </Heading>
    </Box>
  );
};

export default Header;
