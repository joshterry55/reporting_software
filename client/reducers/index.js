import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import flash from './flash';
import user from './user'
import assignedcompany from './assignedcompany'
import assignedregions from './assignedregions'

const rootReducer = combineReducers({
  routing: routerReducer,
  flash,
  user,
  assignedcompany,
  assignedregions
 });

export default rootReducer;
