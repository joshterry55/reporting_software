import React from 'react';
import { connect } from 'react-redux'
import { login } from '../actions/auth'

class AuthenticatedRoutes extends React.Component {

  componentDidMount() {
    $.ajax({
      url: '/api/companies',
      type: 'GET',
      dataType: 'JSON'
    }).done( company => {
      this.props.dispatch({ type: 'ASSIGNED_COMPANY', company })
    }).fail( data => {
      console.log(data);
    });
  }

  render() {
    return(
      <div>
        { this.props.user.id ? this.props.children : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user}
}

export default connect(mapStateToProps)(AuthenticatedRoutes)
