import api from '@sdk/api/api';

const logout = async (): Promise<{ logout: boolean }> => {
  return api.get('auth/logout-admin').json();
};

export default logout;
