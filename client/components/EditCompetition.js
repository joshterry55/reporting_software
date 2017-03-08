import React from 'react'
import { connect } from 'react-redux'
import AnnouncementsNav from './AnnouncementsNav'
import CompetitionPrizes from './CompetitionPrizes'
import { setassignedregions, setassignedoffices } from '../actions/companysetup'
import { Link } from 'react-router';

class EditCompetition extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false}

    this.submitEdittedCompetition = this.submitEdittedCompetition.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.dateFormat = this.dateFormat.bind(this)
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
    let competitionId = parseInt(this.props.params.id)
    $.ajax({
      url: `/api/competition/${competitionId}/prizes`,
      type: 'GET',
      dataType: 'JSON'
    }).done( prizes => {
      this.props.dispatch({type: 'CURRENT_PRIZES', prizes})
    }).fail( data => {

    })
    $.ajax({
      url: `/api/competition/${competitionId}/competition_groups`,
      type: 'GET',
      dataType: 'JSON'
    }).done( groups => {
      this.props.dispatch({type: 'CURRENT_GROUPS', groups})
    }).fail( data => {

    })
    $.ajax({
      url: `/api/competitions/${competitionId}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( competition => {
      this.props.dispatch({type: 'CURRENT_COMPETITION', competition})
    }).fail( data => {

    })

  }

  componentDidUpdate() {
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    if(this.props.currentcompetition.start_date) {
      // let currentCompetition = this.props.currentcompetition
      // let newStart = new Date(currentCompetition.start_date)
      // newStart = newStart.setDate(newStart.getDate() + 1)
      // let start = new Date(newStart)
      // let newEnd = new Date(currentCompetition.end_date)
      // newEnd = newEnd.setDate(newEnd.getDate())
      // let end = new Date(newEnd)
      // $("#editStartDate").val(start);
      // $("#editEndDate").val(end);
    }
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit})
  }

  submitEdittedCompetition(e) {
    e.preventDefault()
    let start = this.refs.editStartDate.value
    let end = this.refs.editEndDate.value
    let endHours = new Date(end)
    let endOfDay = endHours.setHours(23,59,59,999)
    let endOfDate = new Date(endOfDay)
    let name = this.refs.editName.value
    let competitionType = this.refs.editCompType.value
    let id = this.props.currentcompetition.id
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
              url: `/api/competitions/${id}`,
              type: 'PUT',
              dataType: 'JSON',
              data: { competition: {
                name: name,
                start_date: start,
                end_date: endOfDate,
                competition_type: competitionType,
              }}
            }).done( competition => {
              this.props.dispatch({type: 'CURRENT_COMPETITION', competition})
              this.toggleEdit()
            }).fail( data => {
            })
          }
        }
      }
    }
  }

  dateString(day) {
    let fullDate = day
    let myDate = []
    myDate.push(fullDate.toDateString().substr(0, 3))
    let monthNumber = fullDate.getMonth();
    let monthNames = ["January", "February", "March", "April",
                      "May", "June", "July", "August", "September",
                      "October", "November", "December"]
    myDate.push(monthNames[monthNumber] + ' ' + fullDate.getDate())
    myDate.push(fullDate.getFullYear())

    return `${myDate[1]}, ${myDate[2]}`
  }

  dateFormat(currentCompetition) {
    if(currentCompetition.start_date) {
      let newStart = new Date(currentCompetition.start_date)
      newStart = newStart.setDate(newStart.getDate() + 1)
      let reformat = new Date(newStart)
      let start = this.dateString(reformat)
      let newEnd = new Date(currentCompetition.end_date)
      newEnd = newEnd.setDate(newEnd.getDate())
      let reformatEnd = new Date(newEnd)
      let end = this.dateString(reformatEnd)
      return(
        <div>
          <span>{start} - {end}</span>
        </div>
      )
    }
  }

  display() {
    if(this.state.edit) {
      if(this.props.currentcompetition.start_date) {
        let currentCompEdit = this.props.currentcompetition
        return(
          <div>
            <form style={{marginTop: '20px'}} onSubmit={this.submitEdittedCompetition}>
              <div className='col s12 m4 offset-m4'>
                <label>Name</label>
                <input ref='editName' type="text" defaultValue={currentCompEdit.name} required />
              </div>
              <div className='col s12 m4 offset-m4'>
                <label>Competition Type</label>
                <select ref='editCompType' className="browser-default add-sale-box" defaultValue={currentCompEdit.competition_type} required>
                  <option value='Team' className='add-sale-input'>Team</option>
                  <option value='Individual' className='add-sale-input'>Individual</option>
                </select>
                <br />
              </div>
              <div className='col s12 m4 offset-m4'>
                <div className='col s6' style={{color: 'white'}}>
                  <label>Start Date</label>
                  <input type="date" ref='editStartDate' id='editStartDate' className="datepicker add-sale-box green-back" placeholder='click to select date' required />
                </div>
                <div className='col s6'>
                  <label>End Date</label>
                  <input type="date" ref='editEndDate' id='editEndDate' className="datepicker add-sale-box red-back" placeholder='click to select date' required />
                </div>
              </div>
              <div className='col s12 center'>
                <input type='submit' className='btn' style={{backgroundColor: '#60b9e8', textShadow: '1px 1px 1px rgba(0,0,0,0.5)'}} />
              </div>
            </form>
            <div className='col s12 center' style={{fontSize: '15px', marginTop: '10px', cursor: 'pointer'}}>
              <span onClick={this.toggleEdit}>Cancel</span>
            </div>
          </div>
        )
      }
    } else {
      let currentCompetition = this.props.currentcompetition
      return(
        <div className='col s12'>
          <div className='col s12 center' style={{fontSize: '20px', marginTop: '20px'}}>
            {currentCompetition.name}
          </div>
          <div className='col s12 center' style={{fontSize: '15px'}}>
            {this.dateFormat(currentCompetition)}
          </div>
          <div className='col s12 center' style={{fontSize: '15px'}}>
            <span>Competition Type: {currentCompetition.competition_type}</span>
          </div>
          <div className='col s12 center' style={{fontSize: '15px'}}>
            <span>Grouped By: {currentCompetition.grouped_by}</span>
          </div>
          <div className='col s12 center' style={{fontSize: '15px', cursor: 'pointer'}}>
            <span onClick={this.toggleEdit}>Edit</span>
          </div>
        </div>
      )
    }
  }

  prizes() {
    let id = parseInt(this.props.params.id)
    return(
      <CompetitionPrizes competitionId={id} />
    )
  }

  render() {
    return(
      <div className='row'>
        <AnnouncementsNav />
        <div className='col s12 center' style={{backgroundColor: '#ccc', marginTop: '0px'}}>
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
            <span style={{fontSize: '20px'}}>
              Edit Competition
            </span>
          </div>
        </div>
        <div className='col s12'>
          {this.display()}
        </div>
        <div className='col s12'>
          {this.prizes()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, currentcompetition, currentprizes, currentgroups } = state
  return { user, assignedcompany, currentcompetition, currentprizes, currentgroups }
}

export default connect(mapStateToProps)(EditCompetition)
