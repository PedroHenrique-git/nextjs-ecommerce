import api from '@sdk/api/api';

const loggedAdmin = async (): Promise<{ admin: AuthUser }> => {
  return api.get('auth/logged-admin').json();
};

export default loggedAdmin;
