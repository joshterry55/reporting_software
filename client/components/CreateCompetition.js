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
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  componentDidUpdate() {
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  addCompetition() {
    return(
      <form style={{marginTop: '20px'}}>
        <div className='col s12 m4 offset-m4'>
          <label>Name</label>
          <input type="text" />
        </div>
        <div className='col s12 m4 offset-m4'>
          <label>Grouped By (Company-wide, region vs region, office vs office)</label>
          <select ref='employee' className="browser-default add-sale-box">
            <option defaultValue="" disabled selected>Select Option</option>
            <option value='office' className='add-sale-input'>Office</option>
            <option value='region' className='add-sale-input'>Region</option>
            <option value='company' className='add-sale-input'>Company</option>
          </select>
          <br />
        </div>
        <div className='col s12 m4 offset-m4'>
          <label>Competition Type</label>
          <select ref='employee' className="browser-default add-sale-box">
            <option defaultValue="" disabled selected>Select Option</option>
            <option value='Team' className='add-sale-input'>Team</option>
            <option value='Individual' className='add-sale-input'>Individual</option>
          </select>
          <br />
        </div>
        <div className='col s12 m4 offset-m4'>
          <div className='col s6' style={{color: 'white'}}>
            <label>Date</label>
            <input type="date" ref='startDate' className="datepicker add-sale-box green-back" placeholder='click to select date' />
          </div>
          <div className='col s6'>
            <label>Date</label>
            <input type="date" ref='endDate' className="datepicker add-sale-box red-back" placeholder='click to select date' />
          </div>
        </div>
      </form>
    )
  }

  // t.integer  "company_id"
  // t.string   "name"
  // t.datetime "start_date"
  // t.datetime "end_date"
  // t.string   "competition_type"
  // t.string   "grouped_by"

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
        <div className='col s12'>
          {this.addCompetition()}
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
