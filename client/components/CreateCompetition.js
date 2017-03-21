import React from 'react'
import { connect } from 'react-redux'
import AnnouncementsNav from './AnnouncementsNav'
import { setassignedregions, setassignedoffices } from '../actions/companysetup'
import { Link } from 'react-router';

class CreateCompetition extends React.Component {
  constructor(props) {
    super(props)

    this.submitCompetition = this.submitCompetition.bind(this)
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

  submitCompetition(e) {
    e.preventDefault()
    let start = this.refs.startDate.value
    let end = this.refs.endDate.value
    let endHours = new Date(end)
    let endOfDay = endHours.setHours(23,59,59,999)
    let endOfDate = new Date(endOfDay)
    let name = this.refs.name.value
    let competitionType = this.refs.compType.value
    let group = this.refs.groupedBy.value
    let id = this.props.assignedcompany.id
    if(group === 'Select Option') {
      confirm('Please select a grouped by option')
    } else {
      if(competitionType === 'Select Option') {
        confirm('Please select a competition type')
      } else {
        if(start === '') {
          confirm('Please select a start date for your competition')
        } else {
          if(end === '') {
            confirm('Please select an end date for your competition')
          } else {
            let newStart = new Date(start)
            let startCheck = newStart.getTime()
            let newEnd = new Date(end)
            let endCheck = newEnd.getTime()
            if(endCheck < startCheck) {
              confirm('End date must be after start date')
            } else {
              $.ajax({
                url: '/api/competitions',
                type: 'POST',
                dataType: 'JSON',
                data: { competition: {
                  company_id: id,
                  name: name,
                  start_date: start,
                  end_date: endOfDate,
                  competition_type: competitionType,
                  grouped_by: group
                }}
              }).done( competition => {
                this.props.history.push(`/editcompetition/${competition.id}`)
              }).fail( data => {
              })
            }
          }
        }
      }
    }
  }

  addCompetition() {
    return(
      <div className='col s12'>
        <form style={{marginTop: '20px'}} onSubmit={this.submitCompetition}>
          <div className='col s12 m4 offset-m4'>
            <label>Name</label>
            <input ref='name' type="text" required />
          </div>
          <div className='col s12 m4 offset-m4'>
            <label>Grouped By (Company-wide, region vs region, office vs office)</label>
            <select ref='groupedBy' className="browser-default add-sale-box">
              <option defaultValue="" disabled selected>Select Option</option>
              <option value='office' className='add-sale-input'>Office</option>
              <option value='region' className='add-sale-input'>Region</option>
              <option value='company' className='add-sale-input'>Company</option>
            </select>
            <br />
          </div>
          <div className='col s12 m4 offset-m4'>
            <label>Competition Type</label>
            <select ref='compType' className="browser-default add-sale-box" required>
              <option defaultValue="" disabled selected>Select Option</option>
              <option value='Team' className='add-sale-input'>Team</option>
              <option value='Individual' className='add-sale-input'>Individual</option>
            </select>
            <br />
          </div>
          <div className='col s12 m4 offset-m4'>
            <div className='col s6' style={{color: 'white'}}>
              <label>Start Date</label>
              <input type="date" ref='startDate' className="datepicker add-sale-box green-back" placeholder='click to select date' required />
            </div>
            <div className='col s6'>
              <label>End Date</label>
              <input type="date" ref='endDate' className="datepicker add-sale-box red-back" placeholder='click to select date' required />
            </div>
          </div>
          <div className='col s12 center'>
            <input type='submit' className='btn' style={{backgroundColor: `${this.props.assignedcompany.accent_color}`, color: `${this.props.assignedcompany.accent_text}`}} value='Create'/>
          </div>
        </form>
        <div className='col s12 m4 offset-m4 center' style={{marginTop: '10px'}}>
          <span><Link to='/competitions'>Cancel</Link></span>
        </div>
      </div>
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
