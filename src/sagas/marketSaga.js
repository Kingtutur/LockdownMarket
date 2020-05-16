import { call, put, select } from 'redux-saga/effects';
import firebase from 'firebase/firebase';

import {
  LOADING,
  SET_REQUEST_STATUS,
  GET_MARKET,
  ADD_MARKET,
  EDIT_MARKET,
  REMOVE_MARKET,
  
} from 'constants/constants';

import { 
    getMarketSuccess, 
    addMarketSuccess, 
    editMarketSuccess,
    removeMarketSuccess 
  } from 'actions/marketActions';

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

function* MarketSaga({ type, payload }) {
  switch (type) {
    case GET_MARKET:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getMarket, payload);
    
        yield put(getMarketSuccess({ 
          market: result.market, 
          lastKey: result.lastKey ? result.lastKey : state.market.lastRefKey,
          total: result.total ? result.total : state.market.total
        }));
        // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
        yield put({ type: LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ADD_MARKET:
      try {
        yield initRequest();

        const key = yield call(firebase.generateMarketKey);

        yield call(firebase.addMarket, key, { ...payload });

        yield put(addMarketSuccess({
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
    case EDIT_MARKET:
      try {
        yield initRequest();


  
          yield call(firebase.editMarket, payload.id, payload.updates);
          yield put(editMarketSuccess({ 
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
    case REMOVE_MARKET:
      try {
        yield initRequest();
        yield call(firebase.removeMarket, payload);
        yield put(removeMarketSuccess(payload));
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

export default MarketSaga;
