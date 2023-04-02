import { useRouter } from 'next/router';
import { useReducer, useRef } from 'react';
import { useIsomorphicLayoutEffect, useLocation } from 'react-use';

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
    }
  | { type: 'set_page'; payload: { page: string | null } }
  | { type: 'set_take'; payload: { take: string | null } }
  | { type: 'set_sort'; payload: { sort: string | null } };

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
    case 'set_page': {
      return {
        ...state,
        page: action.payload.page ?? '1',
      };
    }
    case 'set_sort': {
      return {
        ...state,
        sort: (action.payload.sort ?? 'asc') as 'asc' | 'desc',
      };
    }
    case 'set_take': {
      return {
        ...state,
        take: action.payload.take ?? '5',
      };
    }
    default:
      return state;
  }
}

function usePagination() {
  const firstRender = useRef(true);
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { push, pathname } = useRouter();

  useIsomorphicLayoutEffect(() => {
    if (firstRender.current) {
      if (!location.href) return;

      const windowURL = new URL(location.href);

      const take = windowURL.searchParams.get('take');
      const page = windowURL.searchParams.get('page');
      const sort = windowURL.searchParams.get('sort');

      take && dispatch({ type: 'set_take', payload: { take } });
      page && dispatch({ type: 'set_page', payload: { page } });
      sort && dispatch({ type: 'set_sort', payload: { sort } });

      firstRender.current = false;
    }

    const { page, sort, take } = state;

    push({ pathname, query: { page, sort, take } }, undefined, {
      shallow: true,
    });
  }, [state]);

  return {
    state,
    dispatch,
  };
}

export default usePagination;
