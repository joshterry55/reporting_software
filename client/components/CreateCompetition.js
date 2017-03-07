import React from 'react'
import { connect } from 'react-redux'
import AnnouncementsNav from './AnnouncementsNav'
import { setassignedregions, setassignedoffices } from '../actions/companysetup'
import { Link } from 'react-router';

class CreateCompetition extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    let companyId = this.props.assignedcompany.id
    this.props.dispatch(setassignedregions(companyId))
    this.props.dispatch(setassignedoffices(companyId))
  }

  componentDidUpdate() {
    $('select').material_select();
  }


  render() {
    return(
      <div className='row'>
        <AnnouncementsNav />
        <div className='col s12 center' style={{backgroundColor: '#ccc', marginTop: '0px'}}>
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
            <span style={{fontSize: '20px'}}>
              Create Competition
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(CreateCompetition)
