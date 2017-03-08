import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import DropZone from 'react-dropzone';
import request from 'superagent';
require('superagent-rails-csrf')(request)

class CompetitionGroups extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false, add: false, avatar: [this.props.user.avatar]}


    this.submitEdittedGroup = this.submitEdittedGroup.bind(this)
    this.submitGroup = this.submitGroup.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.setGroup = this.setGroup.bind(this)
    this.deleteGroup = this.deleteGroup.bind(this)
    this.teamOptions = this.teamOptions.bind(this)
    this.findName = this.findName.bind(this)
    this.findAvatar = this.findAvatar.bind(this)
  }

  componentDidMount() {

    let competitionId = this.props.competitionId
    if(competitionId) {
      $.ajax({
        url: `/api/competition/${competitionId}/competition_groups`,
        type: 'GET',
        dataType: 'JSON'
      }).done( groups => {
        this.props.dispatch({type: 'CURRENT_GROUPS', groups})
      }).fail( data => {

      })
    }

  }

  componentDidUpdate() {
    $('select').material_select();
  }



  toggleEdit() {
    this.setState({ edit: !this.state.edit})
  }

  toggleAdd() {
    this.setState({ add: !this.state.add})
  }

  submitEdittedGroup(e, id) {
    e.preventDefault()
    let groupId = this.refs.editGroup.value
    let name = this.findName(groupId)
    let avatar = this.findAvatar(groupId)
    $.ajax({
      url: `/api/competition_groups/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { competition_group: {
        name: name,
        avatar: avatar,
        group_id: groupId
      }}
    }).done( group => {
      this.props.dispatch({type: 'UPDATE_CURRENT_GROUPS', group})
      this.toggleEdit()
    }).fail( data => {

    })
  }

  deleteGroup(group) {
    let confirmed = confirm('Delete Team?')
    if(confirmed) {
      let id = group.id
      $.ajax({
        url: `/api/competition_groups/${id}`,
        type: 'DELETE',
        dataType: 'JSON'
      }).done( group => {
        this.props.dispatch({type: 'REMOVE_GROUP', group})
      }).fail( data => {

      })
    }
  }

  findName(groupId) {
    if(this.props.currentcompetition.id) {
      let filter = this.props.currentcompetition.grouped_by
      if(filter === 'office') {
        let officeName
        this.props.leaderboardoffices.map( office => {
          if(office.id === parseInt(groupId)) {
            officeName = office.name
          }
        })
        if(officeName) {
          return(
            officeName
          )
        }
      }
      if(filter === 'region') {
        let regionName
        this.props.leaderboardregions.map( region => {
          if(region.id === parseInt(groupId)) {
           regionName = region.name
          }
        })
        if(regionName) {
          return(
            regionName
          )
        }
      }
      if(filter === 'company') {
        let name = this.props.assignedcompany.name
        return name
      }
    }
  }

  findAvatar(groupId) {
    if(this.props.currentcompetition.id) {
      let filter = this.props.currentcompetition.grouped_by
      if(filter === 'office') {
        let officeAvatar
        this.props.leaderboardoffices.map( office => {
          if(office.id === parseInt(groupId)) {
            officeAvatar = office.avatar
          }
        })
        if(officeAvatar) {
          return(
            officeAvatar
          )
        }
      }
      if(filter === 'region') {
        let regionAvatar
        this.props.leaderboardregions.map( region => {
          if(region.id === parseInt(groupId)) {
           regionAvatar = region.avatar
          }
        })
        if(regionAvatar) {
          return(
            regionAvatar
          )
        }
      }
      if(filter === 'company') {
        let avatar = this.props.assignedcompany.avatar
        return avatar
      }
    }
  }

  submitGroup(e) {
    e.preventDefault()
    let id = this.props.currentcompetition.id
    let groupId = this.refs.newGroup.value
    let name = this.findName(groupId)
    let avatar = this.findAvatar(groupId)

    $.ajax({
      url: '/api/competition_groups',
      type: 'POST',
      dataType: 'JSON',
      data: { competition_group: {
        competition_id: id,
        name: name,
        avatar: avatar,
        group_id: groupId
      }}
    }).done( group => {
      this.props.dispatch({type: 'ADD_GROUP', group})
      this.toggleAdd()
    }).fail( data => {

    })
  }

  setGroup(group) {
    this.props.dispatch({type: 'CURRENT_GROUP', group})
    this.toggleEdit()
  }

  display() {
    if(this.props.currentgroups.length) {
      return this.props.currentgroups.map( group => {
        if(this.state.edit) {
          if(group.id === this.props.currentgroup.id) {
            return(
              <div  key={group.id} className='col s12 m6 l4'>
                <div className='col s12'>
                  <form ref='editGroupForm' onSubmit={(e) => this.submitEdittedGroup(e, group.id)}>
                    <div className="input-field col s12">
                      <select ref='editGroup' defaultValue={group.grouped_by}>
                        {this.teamOptions()}
                      </select>
                      <label>Select {this.props.currentcompetition.grouped_by}</label>
                    </div>
                    <div className='col s12 center' style={{marginBottom: '10px'}}>
                      <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Update' />
                    </div>
                  </form>
                  <div className='center col s12' style={{marginBottom: '0px'}}>
                    <span onClick={this.toggleEdit} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
                  </div>
                </div>
              </div>
            )
          } else {
            return(
              <div key={group.id} className='col s12 m6 l4'>
                <div style={{height: '225px', marginBottom: '10px'}}>
                  <div style={{
                      backgroundImage: `url(${group.avatar})`,
                      width: '100%',
                      height: '100%',
                      maxWidth: '225px',
                      display: 'block',
                      backgroundSize: 'cover',
                      borderRadius: '5px',
                      boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                      margin: '10px auto'
                    }}>
                  </div>
                </div>
                <div className='center'>
                  {group.name}
                  <i className="tiny material-icons edit-icon" onClick={() => this.setGroup(group)} style={{cursor: 'pointer'}} title='Edit Team'>edit</i>
                </div>
              </div>
            )
          }
        } else {
          return(
            <div key={group.id} className='col s12 m6 l4'>
              <div style={{height: '225px', marginBottom: '10px'}}>
                <div style={{
                    backgroundImage: `url(${group.avatar})`,
                    width: '100%',
                    height: '100%',
                    maxWidth: '225px',
                    display: 'block',
                    backgroundSize: 'cover',
                    borderRadius: '5px',
                    boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                    margin: '10px auto'
                  }}>
                </div>
              </div>
              <div className='center'>
                {group.name}
                <i className="tiny material-icons edit-icon" onClick={() => this.setGroup(group)} style={{cursor: 'pointer'}} title='Edit Team'>edit</i>
                <i className="tiny material-icons delete-icon" onClick={() => this.deleteGroup(group)} style={{cursor: 'pointer'}} title='Delete Team'>delete</i>
              </div>
            </div>
          )
        }
      })
    } else {
      return(
        <div className='center' style={{color: '#bbb'}}>
          No Teams
        </div>
      )
    }
  }

  teamOptions() {
    if(this.props.currentcompetition.id) {
      let competition = this.props.currentcompetition
      if(competition.grouped_by === 'office') {
        return this.props.leaderboardoffices.map( office => {
          return(
            <option key={office.id} value={office.id}>{office.name}</option>
          )
        })
      }
      if(competition.grouped_by === 'region') {
        return this.props.leaderboardregions.map( region => {
          return(
            <option key={region.id} value={region.id}>{region.name}</option>
          )
        })
      }
      if(competition.grouped_by === 'company') {
        let company = this.props.assignedcompany
        return(
          <option value={company.id}>{company.name}</option>
        )
      }
    }
  }

  displayAdd() {
    if(this.state.add) {
      return(
        <div className="col s12">
          <form className='col s12 m4 offset-m4' onSubmit={this.submitGroup}>
            <div className="input-field col s12">
              <select ref='newGroup'>
                <option value="" disabled selected>Choose Team</option>
                {this.teamOptions()}
              </select>
              <label>Select {this.props.currentcompetition.grouped_by}</label>
            </div>
            <div className='col s12 center'>
              <input type='submit' className='btn' style={{backgroundColor: '#60b9e8', textShadow: '1px 1px 1px rgba(0,0,0,0.5)'}} />
            </div>
          </form>
          <div className='col s12 center' style={{marginTop: '10px'}}>
            <span onClick={this.toggleAdd} style={{cursor: 'pointer'}}>Cancel</span>
          </div>
        </div>
      )
    } else {

    }
  }


  render() {
    return(
      <div className='row'>
        <div className='col s12'>
          <div className='center'>
            <span style={{fontSize: '20px'}}>Teams</span><br/>
            <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: '#60b9e8', fontSize: '15px'}} >+ Add Team</span>
          </div>
          {this.displayAdd()}
          <div className='col s12' style={{marginTop: '15px'}}>
            {this.display()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, currentcompetition, currentprizes, currentprize, leaderboardregions, leaderboardoffices, currentgroups, currentgroup } = state
  return { user, assignedcompany, currentcompetition, currentprizes, currentprize, leaderboardregions, leaderboardoffices, currentgroups, currentgroup }
}

export default connect(mapStateToProps)(CompetitionGroups)
