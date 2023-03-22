import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import login from '@sdk/login/admin';
import { FormEvent, useState } from 'react';
import { useMutation } from 'react-query';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { mutate } = useMutation(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      return login(loginData);
    },
    {
      onSuccess: () => {
        window.location.reload();
      },
    },
  );

  return (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="center"
      marginTop={'30'}
    >
      <chakra.form
        display={'flex'}
        flexDirection={'column'}
        maxW={'400px'}
        alignItems="center"
        width={'100%'}
        onSubmit={mutate}
      >
        <Heading fontSize={'large'} color={'gray.900'} marginBottom="6">
          Login form
        </Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type={'email'}
            placeholder="example@email.com"
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl marginTop="5">
          <FormLabel>Password</FormLabel>
          <Input
            type={'password'}
            placeholder="abc123"
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </FormControl>
        <Button
          colorScheme={'teal'}
          type="submit"
          marginTop="6"
          w={'100%'}
          display="block"
        >
          Sign in
        </Button>
      </chakra.form>
    </Box>
  );
};

export default Login;
