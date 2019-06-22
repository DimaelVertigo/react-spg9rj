import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const rootReducer = combineReducers({...reducers});
const middlewares = [thunk];
const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));