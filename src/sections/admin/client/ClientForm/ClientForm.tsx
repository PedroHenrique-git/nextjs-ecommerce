import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import ClientService from '@services/client/client.service';
import { UpdateClientDto } from '@services/client/dto/update-client.dto';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import yupPassword from 'yup-password';

yupPassword(yup);

interface Props {
  title: string;
  type: 'create' | 'update';
  client?: Client | undefined;
  closeUpdateModal?(): void;
  closeCreateModal?(): void;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const createSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least eight characters')
    .minNumbers(1, 'Password must be at least one number')
    .minUppercase(1, 'Password must be at least one uppercase letter')
    .minSymbols(1, 'Password must be at least one symbol')
    .minLowercase(1, 'Password must be at least one lowercase letter'),
  name: yup.string().required('Name is required'),
});

const updateSchema = yup.object().shape(
  {
    email: yup.string().email('Invalid email'),
    password: yup.string().when('password', {
      is: (password: string) => password !== '',
      then: (schema) =>
        schema
          .min(8, 'Password must be at least eight characters')
          .minNumbers(1, 'Password must be at least one number')
          .minUppercase(1, 'Password must be at least one uppercase letter')
          .minSymbols(1, 'Password must be at least one symbol')
          .minLowercase(1, 'Password must be at least one lowercase letter'),
    }),
    name: yup.string(),
  },
  [['password', 'password']],
);

const clientService = new ClientService('admin');

const ClientForm = ({
  title,
  type,
  client,
  closeCreateModal,
  closeUpdateModal,
}: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    values: {
      email: type === 'update' && client ? client.email : '',
      name: type === 'update' && client ? client.name : '',
      password: '',
    },
    resolver: yupResolver(type === 'create' ? createSchema : updateSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (values: FormValues) => {
      if (type === 'create') {
        return clientService.create(values);
      }

      const updateClient: UpdateClientDto = {
        ...(values.email ? { email: values.email } : {}),
        ...(values.name ? { name: values.name } : {}),
        ...(values.password ? { password: values.password } : {}),
      };

      return clientService.update(Number(client?.id), updateClient);
    },
    onSuccess: (data) => {
      if ('failed-request' in data) {
        toast({
          status: 'error',
          description: 'Something went wrong, try again in a few minutes',
          isClosable: true,
        });

        return;
      }

      toast({
        status: 'success',
        description: type === 'update' ? 'Client updated' : 'Client created',
        isClosable: true,
        onCloseComplete: () => {
          queryClient.refetchQueries('client-module');

          if (client) {
            queryClient.refetchQueries(`client-${client.id}`);
          }

          closeCreateModal?.();
          closeUpdateModal?.();
        },
      });
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
          {title}
        </Heading>
        <FormControl
          marginTop="5"
          isInvalid={!!errors.name}
          {...(type === 'create' ? { isRequired: true } : {})}
        >
          <FormLabel>Name</FormLabel>
          <Input type={'text'} placeholder="example" {...register('name')} />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isInvalid={!!errors.email}
          {...(type === 'create' ? { isRequired: true } : {})}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type={'email'}
            placeholder="example@email.com"
            {...register('email')}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          marginTop="5"
          isInvalid={!!errors.password}
          {...(type === 'create' ? { isRequired: true } : {})}
        >
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
          {type === 'create' ? 'create user' : 'updated user'}
        </Button>
      </chakra.form>
    </Box>
  );
};

export default ClientForm;
