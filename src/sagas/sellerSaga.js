import { call, put, select } from 'redux-saga/effects';
import firebase from 'firebase/firebase';

import {
  LOADING,
  SET_REQUEST_STATUS,
  GET_SELLER,
  ADD_SELLER,
  EDIT_SELLER,
  REMOVE_SELLER,
  
} from 'constants/constants';

import { 
    getSellerSuccess, 
    addSellerSuccess, 
    editSellerSuccess,
    removeSellerSuccess 
  } from 'actions/sellerActions';

import { displayActionMessage } from 'helpers/utils';
import { history } from 'routers/AppRouter';

function* initRequest() {
  yield put({ type: LOADING, payload: true });
  yield put({ type: SET_REQUEST_STATUS, payload: null });
}

function* handleError(e) {
  yield put({ type: LOADING, payload: false });
  yield put({ type: SET_REQUEST_STATUS, payload: e });
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* SellerSaga({ type, payload }) {
  switch (type) {
    case GET_SELLER:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getSeller, payload);
    
        yield put(getSellerSuccess({ 
          seller: result.seller, 
          lastKey: result.lastKey ? result.lastKey : state.seller.lastRefKey,
          total: result.total ? result.total : state.market.total
        }));
        // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
        yield put({ type: LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ADD_SELLER:
      try {
        yield initRequest();

        const key = yield call(firebase.generateSellerKey);

        yield call(firebase.addSeller, key, { ...payload });

        yield put(addSellerSuccess({
          id: key,
          ...payload
        }));
        yield handleAction('/dashboard/market', 'Item succesfully added', 'success');
        yield put({ type: LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to add: ' + e.message_, 'error');
      }
      break;
    case EDIT_SELLER:
      try {
        yield initRequest();


  
          yield call(firebase.editSeller, payload.id, payload.updates);
          yield put(editSellerSuccess({ 
            id: payload.id, 
            updates: payload.updates
          }));
          
        

        yield handleAction('/dashboard/market', 'Item succesfully edited', 'success');
        yield put({ type: LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to edit: ' + e.message, 'error');
      }
      break;
    case REMOVE_SELLER:
      try {
        yield initRequest();
        yield call(firebase.removeSeller, payload);
        yield put(removeSellerSuccess(payload));
        yield put({ type: LOADING, payload: false });
        yield handleAction('/dashboard/market', 'Item succesfully removed', 'success');
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to remove: ' + e.message, 'error');
      }
      break;
    default:
      return;
  }
}

export default SellerSaga;
