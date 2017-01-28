import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import flash from './flash';
import user from './user'

const rootReducer = combineReducers({
  routing: routerReducer,
  flash,
  user
 });

export default rootReducer;
