import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AuthenticatedRoutes from './components/AuthenticatedRoutes';
import Announcements from './components/Announcements'
import Leaderboards from './components/Leaderboards'
import LeaderboardEmployees from './components/LeaderboardEmployees'
import Trainings from './components/Trainings'
import Employee from './components/Employee'
import Admin from './components/Admin'
import Company from './components/Company'
import Region from './components/Region'
import Office from './components/Office'
import CreateCompany from './components/CreateCompany'
import HomePage from './components/HomePage'
import AddSale from './components/AddSale'
import RegionSelect from './components/RegionSelect'
import ReportRegionSelect from './components/ReportRegionSelect'
import OfficeLeaderboard from './components/OfficeLeaderboard'
import RegionLeaderboard from './components/RegionLeaderboard'
import CompanyLeaderboard from './components/CompanyLeaderboard'


const AdminAccess = UserAuthWrapper({
  authSelector: state => state.user,
  predicate: user => { return user.role === 'Admin'},
  redirectAction: () => browserHistory.push('/'),
  wrapperDisplayName: 'UserIsAdmin'
})

const AuthenticatedAccess = UserAuthWrapper({
  authSelector: state => state.user,
  predicate: user => { return user.id },
  FailureComponent: () => <SignIn />,
  wrapperDisplayName: 'UserIsLoggedIn'
})

const AuthWrapper = AuthenticatedAccess( (props) => props.children )

const AdminRoutes = AdminAccess( (props) => props.children )

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route component={AuthWrapper}>
        <Route path='/announcements' component={Announcements} />
        <Route path='/leaderboards' component={Leaderboards}/>
        <Route path='/leaderboards/employees' component={LeaderboardEmployees}/>
        <Route path='/leaderboards/offices' component={OfficeLeaderboard}/>
        <Route path='/leaderboards/regions' component={RegionLeaderboard}/>
        <Route path='/leaderboards/company' component={CompanyLeaderboard}/>
        <Route path='/employee' component={Employee} />
        <Route path='/trainings' component={Trainings} />
        <Route component={AdminRoutes}>
          <Route path='/company' component={Company} />
          <Route path='/region/:id' component={Region} />
          <Route path='/office/:id' component={Office} />
          <Route path='/createcompany' component={CreateCompany} />
          <Route path='/admin' component={Admin} />
          <Route path='/addsale' component={RegionSelect} />
          <Route path='/reports' component={ReportRegionSelect} />
        </Route>
      </Route>
      <Route path="*" status={404} component={NoMatch}/>
    </Route>
  </Route>
)
