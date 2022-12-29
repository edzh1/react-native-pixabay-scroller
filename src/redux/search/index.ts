import {ActionTypes} from './search.types';
import {SearchAction} from './search.actions';
import {SearchState, PixabayResponse} from './types';

const initialState: SearchState = {
  searchResult: {
    total: 0,
    totalHits: 0,
    hits: [],
  } as PixabayResponse,
  page: 1,
  error: '',
  searchQuery: '',
  isLoading: false,
  hasMore: false,
  isLoadingMore: false,
};

const searchReducer = (
  state: SearchState = initialState,
  action: SearchAction,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_SEARCH_RESULT_REQUEST:
      return {
        ...state,
        page: 1,
        searchQuery: action.payload.q,
        isLoading: true,
      };
    case ActionTypes.FETCH_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        searchResult: action.payload.result,
        hasMore: action.payload.result.hits.length > 0,
        error: false,
        isLoading: false,
      };
    case ActionTypes.FETCH_SEARCH_RESULT_FAILURE:
      return {
        ...state,
        searchResult: [],
        hasMore: false,
        error: action.payload.error,
        isLoading: false,
      };
    case ActionTypes.FETCH_MORE_SEARCH_RESULT_REQUEST:
      return {
        ...state,
        isLoadingMore: true,
      };
    case ActionTypes.FETCH_MORE_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        searchResult: {
          ...state.searchResult,
          hits: [...state.searchResult.hits, ...action.payload.result],
        },
        error: false,
        isLoadingMore: false,
        hasMore: action.payload.result.length > 0,
        page: action.payload.result.length > 0 ? state.page + 1 : state.page,
      };
    case ActionTypes.FETCH_MORE_SEARCH_RESULT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoadingMore: false,
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};

export default searchReducer;
