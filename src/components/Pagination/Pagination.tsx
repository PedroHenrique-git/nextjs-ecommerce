import { Box, Button } from '@chakra-ui/react';
import { Action } from '@sdk/pagination';
import { Dispatch } from 'react';

interface Props {
  paginationInfo: PaginationInfo;
  dispatch: Dispatch<Action>;
}

const Pagination = ({ dispatch, paginationInfo }: Props) => {
  const { prevPageUrl, nextPageUrl } = paginationInfo;

  return (
    <Box display={'flex'} alignItems={'center'} gap={'15'} margin={'25px 0'}>
      <Button
        onClick={() =>
          dispatch({
            type: 'set_prev_page',
            payload: { prevPageUrl },
          })
        }
        disabled={!prevPageUrl}
      >
        prev
      </Button>
      <Button
        onClick={() =>
          dispatch({
            type: 'set_next_page',
            payload: { nextPageUrl },
          })
        }
        disabled={!nextPageUrl}
      >
        next
      </Button>
    </Box>
  );
};

export default Pagination;
