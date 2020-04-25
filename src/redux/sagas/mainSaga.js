import {
  takeEvery,
  takeLatest,
  throttle,
  select,
  call,
  put,
} from 'redux-saga/effects';
// import axios from 'axios';

export default function* mainSaga() {
  yield console.log('this is mainSaga!');
  // yield takeLatest('addMessage', function* () {
  //   const mainReducer = yield select((state) => state.mainReducer);
  //   yield put({
  //     type: 'latestData',
  //     data: mainReducer,
  //   });
  // });
}
