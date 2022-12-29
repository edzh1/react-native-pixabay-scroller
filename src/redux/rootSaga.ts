import {all, call} from 'redux-saga/effects';
import {getImagesSaga, getMoreImagesSaga} from './search/search.sagas';

export function* rootSaga() {
  yield all([call(getImagesSaga), call(getMoreImagesSaga)]);
}
