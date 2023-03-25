import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import SessionService from '@services/session/session.service';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const sessionService = new SessionService();

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const toast = useToast();
  const { push } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: async (values: FormValues) => {
      return sessionService.loginAdmin(values.email, values.password);
    },
    onSuccess: (data) => {
      if ('failed-request' in data) {
        toast({
          status: 'error',
          description: 'Invalid credentials',
          isClosable: true,
        });

        return;
      }

      push('/admin');
    },
  });

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
        onSubmit={handleSubmit((values) => mutate(values))}
      >
        <Heading fontSize={'large'} color={'gray.900'} marginBottom="6">
          Login form
        </Heading>
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type={'email'}
            placeholder="example@email.com"
            {...register('email')}
          />
          {}
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl marginTop="5" isInvalid={!!errors.password} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type={'password'}
            placeholder="abc123"
            {...register('password')}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
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
