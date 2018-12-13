import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import App from './App';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'SET_PLANTS':
        return action.payload
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};

function* fetchPlants() {
    const plantsRes = yield call(axios.get, '/api/plant')
    yield put({type: 'SET_PLANTS', payload: plantsRes.data})
}

function* addPlant(action) {
    yield call(axios.post, '/api/plant', action.payload)
    yield put({type: 'FETCH_PLANTS'})
}

function* deletePlant(action) {
    yield call(axios.delete, `/api/plant?id=${action.payload}`)
    yield put({type: 'FETCH_PLANTS'})
}
function* watcherSaga() {
    yield takeEvery('FETCH_PLANTS', fetchPlants);
    yield takeEvery('ADD_PLANT', addPlant);
    yield takeEvery('DELETE_PLANT', deletePlant)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
