/* Redux saga class
 * requires type.
 * type - 'images'
*/

import { put, call, select } from 'redux-saga/effects';
import getAllImages from 'app/lib/api/methods/getAllImages';
import * as imagesActions from '../actions';

// Our worker Saga that get all images
export default function* getImagesAsync(action) {

  yield put(imagesActions.enableLoader());

  const response = yield call(getAllImages(action.type));


  if (response.success) {
    yield put(imagesActions.onImagesResponse(action.type, response.data));
    yield put(imagesActions.disableLoader({}));

  } else {
    yield put(imagesActions.requestFailed());
    yield put(imagesActions.disableLoader({}));
  }
}