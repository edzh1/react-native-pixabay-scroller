import {ActionTypes} from './search.types';
import {PixabayResponse, SearchResult} from './types';

export type SearchAction =
  | {
      type: ActionTypes.FETCH_SEARCH_RESULT_REQUEST;
      payload: {
        q: string;
      };
    }
  | {
      type: ActionTypes.FETCH_SEARCH_RESULT_SUCCESS;
      payload: {
        result: PixabayResponse;
      };
    }
  | {
      type: ActionTypes.FETCH_SEARCH_RESULT_FAILURE;
      payload: {error: string};
    }
  | {
      type: ActionTypes.FETCH_MORE_SEARCH_RESULT_REQUEST;
      payload: {
        q: string;
        page: number;
      };
    }
  | {
      type: ActionTypes.FETCH_MORE_SEARCH_RESULT_FAILURE;
      payload: {error: string};
    }
  | {
      type: ActionTypes.FETCH_MORE_SEARCH_RESULT_SUCCESS;
      payload: {result: SearchResult[]};
    }
  | {
      type: ActionTypes.CLEAR_ERROR;
      payload: {};
    };

export const fetchSearchResultRequest = (
  searchQuery: string,
): SearchAction => ({
  type: ActionTypes.FETCH_SEARCH_RESULT_REQUEST,
  payload: {q: searchQuery},
});

export const fetchSearchResultSuccess = (
  searchResult: PixabayResponse,
): SearchAction => ({
  type: ActionTypes.FETCH_SEARCH_RESULT_SUCCESS,
  payload: {result: searchResult},
});

export const fetchSearchResultFailure = (
  errorMessage: string,
): SearchAction => ({
  type: ActionTypes.FETCH_SEARCH_RESULT_FAILURE,
  payload: {error: errorMessage},
});

export const fetchMoreSearchResultRequest = (payload: {
  searchQuery: string;
  page: number;
}): SearchAction => ({
  type: ActionTypes.FETCH_MORE_SEARCH_RESULT_REQUEST,
  payload: {
    page: payload.page,
    q: payload.searchQuery,
  },
});

export const fetchMoreSearchResultSuccess = (
  searchResult: SearchResult[],
): SearchAction => ({
  type: ActionTypes.FETCH_MORE_SEARCH_RESULT_SUCCESS,
  payload: {result: searchResult},
});

export const fetchMoreSearchResultFailure = (
  errorMessage: string,
): SearchAction => ({
  type: ActionTypes.FETCH_MORE_SEARCH_RESULT_FAILURE,
  payload: {error: errorMessage},
});

export const clearError = (): SearchAction => ({
  type: ActionTypes.CLEAR_ERROR,
  payload: {},
});
