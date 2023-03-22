import api from '@sdk/api/api';

type LoginData = {
  email: string;
  password: string;
};

const login = async ({
  email,
  password,
}: LoginData): Promise<{ access_token: string }> => {
  return api
    .post('auth/login-admin', {
      json: {
        email,
        password,
      },
    })
    .json();
};

export default login;
