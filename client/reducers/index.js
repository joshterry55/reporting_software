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
import setdate from './setdate'
import officesales from './officesales'
import officetotalcancel from './officetotalcancel'
import officetotalclose from './officetotalclose'
import officetotalkw from './officetotalkw'
import officetotalsitdown from './officetotalsitdown'
import officetotalsitesurvey from './officetotalsitesurvey'
import currentsale from './currentsale'
import weekdates from './weekdates'
import leaderboardtotals from './leaderboardtotals'

const rootReducer = combineReducers({
  routing: routerReducer,
  flash,
  user,
  assignedcompany,
  assignedregions,
  currentregion,
  assignedoffices,
  currentoffice,
  employees,
  setdate,
  officesales,
  officetotalcancel,
  officetotalclose,
  officetotalkw,
  officetotalsitdown,
  officetotalsitesurvey,
  currentsale,
  weekdates,
  leaderboardtotals
 });

export default rootReducer;
