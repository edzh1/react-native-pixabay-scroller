import {takeLatest, all, put, call} from 'redux-saga/effects';
import {
  fetchSearchResultRequest,
  fetchSearchResultSuccess,
  fetchSearchResultFailure,
  fetchMoreSearchResultRequest,
  fetchMoreSearchResultSuccess,
  fetchMoreSearchResultFailure,
} from './search.actions';
import {ActionTypes} from './search.types';
import axiosInstance from 'src/axiosInstance';
import {PixabayResponse} from './types';
import axios, {AxiosError, AxiosResponse} from 'axios';
// @ts-ignore
import {PIXABAY_API_KEY} from '@env';

function* getImages(action: ReturnType<typeof fetchSearchResultRequest>) {
  try {
    const response: AxiosResponse<PixabayResponse> = yield call(
      axiosInstance.get,
      '/',
      {
        params: {
          page: 1,
          per_page: 20,
          key: PIXABAY_API_KEY,
          ...action.payload,
        },
      },
    );
    yield put(fetchSearchResultSuccess(response.data));
  } catch (err) {
    const error = err as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      if (error.response) {
        yield put(fetchSearchResultFailure(error.response.data));
        return;
      } else if (error.request) {
        yield put(fetchSearchResultFailure('No response'));
        return;
      }
    }

    yield put(fetchSearchResultFailure(error.message));
  }
}

function* getMoreImages(
  action: ReturnType<typeof fetchMoreSearchResultRequest>,
) {
  try {
    const response: AxiosResponse<PixabayResponse> = yield call(
      axiosInstance.get,
      '/',
      {
        params: {
          per_page: 20,
          key: PIXABAY_API_KEY,
          ...action.payload,
        },
      },
    );
    yield put(fetchMoreSearchResultSuccess(response.data.hits));
  } catch (err) {
    const error = err as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      if (error.response) {
        yield put(fetchSearchResultFailure(error.response.data));
        return;
      } else if (error.request) {
        yield put(fetchMoreSearchResultFailure('No response'));
        return;
      }
    }

    yield put(fetchMoreSearchResultFailure(error.message));
  }
}

function* getImagesSaga() {
  yield all([takeLatest(ActionTypes.FETCH_SEARCH_RESULT_REQUEST, getImages)]);
}
function* getMoreImagesSaga() {
  yield all([
    takeLatest(ActionTypes.FETCH_MORE_SEARCH_RESULT_REQUEST, getMoreImages),
  ]);
}

export {getImagesSaga, getMoreImagesSaga};
