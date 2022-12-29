import {createSelector} from 'reselect';
import {RootState} from '../types';

const selectSearch = (state: RootState) => state.search;

export const selectIsSearchLoading = (state: RootState) =>
  state.search.isLoading;
export const selectError = (state: RootState) => state.search.error;
export const selectSearchHasMore = (state: RootState) => state.search.hasMore;
export const selectSearchQuery = (state: RootState) => state.search.searchQuery;
export const selectIsSearchLoadingMore = (state: RootState) =>
  state.search.isLoadingMore;
export const selectSearchPage = (state: RootState) => state.search.page;

export const selectSearchResults = createSelector(
  [selectSearch],
  search => search.searchResult,
);
