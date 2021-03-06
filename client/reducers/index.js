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
import trainingcategories from './trainingcategories'
import trainingsections from './trainingsections'
import currentcategory from './currentcategory'
import currentsection from './currentsection'
import currentvideo from './currentvideo'
import trainingvideos from './trainingvideos'
import lifetimekw from './lifetimekw'
import currentuser from './currentuser'
import threemonth from './threemonth'
import sixmonth from './sixmonth'
import competitions from './competitions'
import currentcompetition from './currentcompetition'
import currentprizes from './currentprizes'
import currentgroups from './currentgroups'
import grouptotals from './grouptotals'
import competitiontotals from './competitiontotals'
import currentprize from './currentprize'
import currentgroup from './currentgroup'
import saleswage from './saleswage'
import employeecustomers from './employeecustomers'

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
  trainingcategories,
  currentcategory,
  currentsection,
  currentvideo,
  trainingsections,
  trainingvideos,
  lifetimekw,
  currentuser,
  threemonth,
  sixmonth,
  competitions,
  currentcompetition,
  currentprizes,
  currentgroups,
  grouptotals,
  competitiontotals,
  currentprize,
  currentgroup,
  saleswage,
  employeecustomers
 });

export default rootReducer;
