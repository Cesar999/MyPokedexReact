import { call, put, takeLatest, fork } from 'redux-saga/effects'
import {getPokemonByName, getAbility, getMove} from '../../Api';

function* workerPoke(action){
    const newPoke = yield call(getPokemonByName, action.payload);
    yield put({type: 'SET_POKE', payload: newPoke}) //To dispatch an action
}
export function* watchPoke(){
    yield takeLatest('FETCH_POKE', workerPoke);
}

function* workerAbility(action){
    const ability = yield call(getAbility, action.payload);
    yield put({type: 'SET_ABILITY', payload: ability}) //To dispatch an action
}
export function* watchAbility(){
    yield takeLatest('FETCH_ABILITY', workerAbility);
}

function* workerMove(action){
    const move = yield call(getMove, action.payload);
    yield put({type: 'SET_MOVE', payload: move}) //To dispatch an action
}
export function* watchMove(){
    yield takeLatest('FETCH_MOVE', workerMove);
}


function* rootSaga() {
    yield fork(watchAbility);
    yield fork(watchPoke);
    yield fork(watchMove);
}

export default rootSaga;