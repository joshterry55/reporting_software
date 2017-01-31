import React from 'react'
import {connect} from 'react-redux'
import Regions from './Regions'

class Company extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.assignedcompany.length) {
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
  }

  display() {
    if(this.props.assignedcompany.length) {
      let companyName = this.props.assignedcompany[0].name
      return(
        <div>
          {companyName}
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.display()}
        <Regions />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(Company)
