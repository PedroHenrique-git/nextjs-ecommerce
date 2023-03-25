import { Box, Heading } from '@chakra-ui/react';

interface InfoProps {
  infoTitle: string;
  infoData: string | number;
}

const Info = ({ infoData, infoTitle }: InfoProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={'3'}
      boxShadow={'base'}
      borderRadius="xl"
      padding={'5'}
      marginBottom={'4'}
    >
      <Heading fontSize={'medium'} color={'gray.900'}>
        {infoTitle}
      </Heading>
      <Box fontSize={'medium'} color={'gray.600'}>
        {infoData}
      </Box>
    </Box>
  );
};

export default Info;
