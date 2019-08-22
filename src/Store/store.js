import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './Reducers';
import createSagaMiddleware from 'redux-saga';
import saga from './Sagas';

const composeEnhancers =
  typeof window === 'object' &&
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose);

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

function configureStore() {
  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(saga);
  return store;
}

export default configureStore;