import React from 'react';
import NavBar from '../components/NavBar'
import { login } from '../actions/auth';
import { companysetup, regionsetup } from '../actions/companysetup';
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('.button-collapse').sideNav({closeOnClick: true, menuWidth: 200})
    this.props.dispatch(login());
    this.props.dispatch(companysetup());
    this.props.dispatch(regionsetup())
  }


  render() {
    return(
      <div>
        <NavBar />
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(App)
