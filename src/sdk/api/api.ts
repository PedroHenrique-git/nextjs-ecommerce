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
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        const { status } = response;

        if (status >= 200 && status < 300) {
          return;
        }

        const data = await response.json();

        data['failed-request'] = true;

        return new Response(JSON.stringify(data), { status: 200 });
      },
    ],
  },
});

export default api;
