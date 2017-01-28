import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AuthenticatedRoutes from './components/AuthenticatedRoutes';

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
      
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route component={AuthWrapper}>
        <Route component={AdminRoutes}>
        </Route>
      </Route>
      <Route path="*" status={404} component={NoMatch}/>
    </Route>
  </Route>
)
