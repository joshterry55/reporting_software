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
import regionsales from './regionsales'
import companysales from './companysales'
import officetotalcancel from './officetotalcancel'
import officetotalclose from './officetotalclose'
import officetotalkw from './officetotalkw'
import officetotalsitdown from './officetotalsitdown'
import officetotalsitesurvey from './officetotalsitesurvey'
import officetotalsitesurveykw from './officetotalsitesurveykw'
import currentsale from './currentsale'
import weekdates from './weekdates'
import leaderboardtotals from './leaderboardtotals'
import leaderboardofficetotals from './leaderboardofficetotals'
import leaderboardregiontotals from './leaderboardregiontotals'
import leaderboardregions from './leaderboardregions'
import leaderboardoffices from './leaderboardoffices'
import currentfilter from './currentfilter'

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
  officetotalsitesurveykw,
  currentsale,
  weekdates,
  leaderboardtotals,
  leaderboardregions,
  leaderboardoffices,
  currentfilter,
  regionsales,
  leaderboardofficetotals,
  companysales,
  leaderboardregiontotals,
 });

export default rootReducer;
