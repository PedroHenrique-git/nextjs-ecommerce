import { useReducer } from 'react';

interface State {
  nextPage: string | null;
  prevPage: string | null;
  take?: string;
  sort?: 'asc' | 'desc';
  page?: string;
}

const initialState: State = {
  nextPage: null,
  prevPage: null,
  page: '1',
  sort: 'asc',
  take: '5',
};

export type Action =
  | {
      type: 'set_next_page';
      payload: {
        nextPageUrl: string | null;
      };
    }
  | {
      type: 'set_prev_page';
      payload: {
        prevPageUrl: string | null;
      };
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set_next_page': {
      const { nextPageUrl } = action.payload;
      const { searchParams } = new URL(nextPageUrl ?? 'http://localhost:3000');

      const take = searchParams.get('take');
      const sort = searchParams.get('sort') as 'asc' | 'desc';
      const page = searchParams.get('page');

      return {
        ...state,
        nextPage: action.payload.nextPageUrl,
        ...(take ? { take } : {}),
        ...(sort ? { sort } : {}),
        ...(page ? { page } : {}),
      };
    }
    case 'set_prev_page': {
      const { prevPageUrl } = action.payload;
      const { searchParams } = new URL(prevPageUrl ?? 'http://localhost:3000');

      const take = searchParams.get('take');
      const sort = searchParams.get('sort') as 'asc' | 'desc';
      const page = searchParams.get('page');

      return {
        ...state,
        prevPage: action.payload.prevPageUrl,
        ...(take ? { take } : {}),
        ...(sort ? { sort } : {}),
        ...(page ? { page } : {}),
      };
    }
    default:
      return state;
  }
}

function usePagination() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}

export default usePagination;
