import { Button } from '@chakra-ui/react';
import logout from '@sdk/logout/admin';
import { SlLogout } from 'react-icons/sl';
import { useMutation } from 'react-query';

const LogoutButton = () => {
  const { mutate } = useMutation(
    () => {
      return logout();
    },
    {
      onSuccess: () => {
        window.location.reload();
      },
    },
  );

  return (
    <Button colorScheme={'red'} gap={'3'} onClick={() => mutate()}>
      <SlLogout />
      logout
    </Button>
  );
};

export default LogoutButton;
