import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import flash from './flash';
import user from './user'
import assignedcompany from './assignedcompany'
import assignedregions from './assignedregions'
import currentregion from './currentregion'
import assignedoffices from './assignedoffices'
import currentoffice from './currentoffice'
import employees from './employees'

const rootReducer = combineReducers({
  routing: routerReducer,
  flash,
  user,
  assignedcompany,
  assignedregions,
  currentregion,
  assignedoffices,
  currentoffice,
  employees
 });

export default rootReducer;
