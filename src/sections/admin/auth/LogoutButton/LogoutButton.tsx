import { Button } from '@chakra-ui/react';
import SessionService from '@services/session/session.service';

import { useRouter } from 'next/router';
import { SlLogout } from 'react-icons/sl';
import { useMutation } from 'react-query';

const sessionService = new SessionService();

const LogoutButton = () => {
  const { push } = useRouter();
  const { mutate } = useMutation(
    () => {
      return sessionService.logoutAdmin();
    },
    {
      onSuccess: () => {
        push('/admin/login');
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
