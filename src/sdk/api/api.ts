import ky from 'ky';

const api = ky.create({
  prefixUrl: `${
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_URL_DEV
      : process.env.NEXT_PUBLIC_API_URL_PROD
  }/v1/api/`,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  credentials: 'include',
});

export default api;
