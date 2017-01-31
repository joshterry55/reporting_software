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
    // if(this.props.user.id) {
    //   $.ajax({
    //     url: '/api/companies',
    //     type: 'GET',
    //     dataType: 'JSON'
    //   }).done( company => {
    //     this.props.dispatch({ type: 'ASSIGNED_COMPANY', company })
    //   }).fail( data => {
    //     console.log(data);
    //   });
    //
    //   debugger
    //   let companyId = this.props.user.assigned_company[0].id
    //   $.ajax({
    //     url: '/api/regions',
    //     type: 'GET',
    //     dataType: 'JSON',
    //     data: { company_id: companyId }
    //   }).done( regions => {
    //     this.props.dispatch({ type: 'ASSIGNED_REGIONS', regions })
    //   }).fail( data => {
    //     console.log(data);
    //   });
    // }
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
