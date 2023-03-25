import { DEFAULT_QUERY_OPTIONS } from '@config/index';
import SessionService from '@services/session/session.service';
import { useQuery } from 'react-query';

const sessionService = new SessionService();

function useGetAdminSession() {
  const { data, isLoading, error, refetch } = useQuery(
    'session-admin',
    () => sessionService.loggedAdmin(),
    DEFAULT_QUERY_OPTIONS,
  );

  return {
    user: data?.admin ?? null,
    refetchSession: refetch,
    isSessionLoading: isLoading,
    isSessionError: error,
  };
}

export default useGetAdminSession;
