import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import countriesReducer from './countries/countries';
import regionsReducer from './regions/regions';

const rootReducer = combineReducers({
  countries: countriesReducer,
  regions: regionsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      logger,
      thunk,
    ),
  ),
);

export default store;
