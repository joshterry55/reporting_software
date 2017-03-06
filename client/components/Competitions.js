import React from 'react'
import { connect } from 'react-redux'
import AnnouncementsNav from './AnnouncementsNav'
import { setassignedregions, setassignedoffices } from '../actions/companysetup'

class Competitions extends React.Component {
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

  competitionFilter() {
    debugger
  }

  render() {
    return(
      <div className='row'>
        <AnnouncementsNav />
        <div className='col s12 center' style={{backgroundColor: '#ccc', marginTop: '0px'}}>
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
            <span style={{fontSize: '20px'}}>
              Competitions
            </span>
          </div>
        </div>
        <div className='col s12 l3' style={{height: '600px', backgroundColor: '#eee', overflow: 'scroll', paddingLeft: '0px', paddingRight: '0px'}}>
          <div className='col s12' style={{height: '75px', backgroundColor: '#777'}}>
            <form className='col s12'>
              <div className='col s12' style={{marginTop: '15px'}}>
                <select className='browser-default' style={{backgroundColor: '#f2f7f'}} onChange={this.competitionFilter}>
                  <option defaultValue="" disabled selected>Select a Filter</option>
                  <option defaultValue="">Active</option>
                  <option defaultValue="">Not Started</option>
                  <option defaultValue="">Completed</option>
                </select>
              </div>
            </form>
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

export default connect(mapStateToProps)(Competitions)
