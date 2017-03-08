import React from 'react'
import { connect } from 'react-redux'
import AnnouncementsNav from './AnnouncementsNav'
import CurrentCompetition from './CurrentCompetition'
import { setassignedregions, setassignedoffices } from '../actions/companysetup'
import { competitionsales } from '../actions/competitionsales'
import { Link } from 'react-router';

class Competitions extends React.Component {
  constructor(props) {
    super(props)

    this.competitionFilter = this.competitionFilter.bind(this)
    this.competitions = this.competitions.bind(this)
    this.currentCompetition = this.currentCompetition.bind(this)
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
    let companyId = this.props.assignedcompany.id
    if($('#active').is(':selected') === true) {
      $.ajax({
        url: `/api/company/${companyId}/active_competitions`,
        type: 'GET',
        dataType: 'JSON'
      }).done( competitions => {
        this.props.dispatch({type: 'COMPETITIONS', competitions})
      }).fail( data => {

      })
    } else if($('#notStarted').is(':selected') === true) {
      $.ajax({
        url: `/api/company/${companyId}/not_started_competitions`,
        type: 'GET',
        dataType: 'JSON'
      }).done( competitions => {
        this.props.dispatch({type: 'COMPETITIONS', competitions})
      }).fail( data => {

      })
    } else if($('#completed').is(':selected') === true) {
      $.ajax({
        url: `/api/company/${companyId}/completed_competitions`,
        type: 'GET',
        dataType: 'JSON'
      }).done( competitions => {
        this.props.dispatch({type: 'COMPETITIONS', competitions})
      }).fail( data => {

      })
    }
  }

  setCurrentComp(competition) {
    this.props.dispatch({type: 'CURRENT_COMPETITION', competition})
    $.ajax({
      url: `/api/competition/${competition.id}/prizes`,
      type: 'GET',
      dataType: 'JSON'
    }).done( prizes => {
      this.props.dispatch({type: 'CURRENT_PRIZES', prizes})
    }).fail( data => {

    })
    $.ajax({
      url: `/api/competition/${competition.id}/competition_groups`,
      type: 'GET',
      dataType: 'JSON'
    }).done( groups => {
      this.props.dispatch({type: 'CURRENT_GROUPS', groups})
    }).fail( data => {

    })
    let id = this.props.assignedcompany.id
    $.ajax({
      url: `/api/company/${id}/competition_sales`,
      type: 'GET',
      dataType: 'JSON',
      data: {
        start_date: competition.start_date,
        end_date: competition.end_date
      }
    }).done( sales => {
      this.props.dispatch(competitionsales(sales))
    }).fail( data => {

    })
  }

  competitions() {
    if(this.props.competitions.length) {
      return this.props.competitions.map( competition => {
        return(
          <div key={competition.id} className="col s12" style={{height: '50px', lineHeight: '50px', fontSize: '20px', borderBottom: '1px solid #ccc'}}>
            <span style={{cursor: 'pointer'}} onClick={() => this.setCurrentComp(competition)}>{competition.name}</span>
          </div>
        )
      })
    }
  }

  currentCompetition() {
    if(this.props.currentcompetition.id) {
      return(
        <CurrentCompetition />
      )
    }
  }

  adminCheck() {
    if(this.props.user.role === 'Admin') {
      return(
        <div className='col s12 center' style={{height: '40px', lineHeight: '40px'}}>
          <span style={{backgroundColor: '#60b9e8', textShadow: '1px 1px 1px rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: '5px'}}><Link to='/createcompetition' style={{color: '#f2f7f7'}}>+ Create Competition</Link></span>
        </div>
      )
    }
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
        <div className='col s12 l3' style={{backgroundColor: '#eee', paddingLeft: '0px', paddingRight: '0px'}}>
          {this.adminCheck()}
          <div className='col s12' style={{height: '75px', backgroundColor: '#777'}}>
            <form className='col s12'>
              <div className='col s12' style={{marginTop: '15px'}}>
                <select className='browser-default' style={{backgroundColor: '#f2f7f'}} onChange={this.competitionFilter}>
                  <option defaultValue="" disabled selected>Select a Filter</option>
                  <option id='active' value='active'>Active</option>
                  <option id='notStarted' value='not started'>Not Started</option>
                  <option id='completed' value='completed'>Completed</option>
                </select>
              </div>
            </form>
          </div>
          <div className='col s12' style={{height: '500px', backgroundColor: '#eee', overflow: 'scroll', paddingLeft: '0px', paddingRight: '0px'}}>
            {this.competitions()}
          </div>
        </div>
        <div className='col s12 l9' style={{height: '600px', backgroundColor: '#f2f7f7'}}>
          {this.currentCompetition()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, competitions, currentcompetition, currentgroups } = state
  return { user, assignedcompany, competitions, currentcompetition, currentgroups }
}

export default connect(mapStateToProps)(Competitions)
