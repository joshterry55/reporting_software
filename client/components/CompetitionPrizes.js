import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import DropZone from 'react-dropzone';
import request from 'superagent';
require('superagent-rails-csrf')(request)

class CompetitionPrizes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false, add: false, avatar: [this.props.user.avatar]}


    this.submitEdittedPrize = this.submitEdittedPrize.bind(this)
    this.submitPrize = this.submitPrize.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.setPrize = this.setPrize.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.deletePrize = this.deletePrize.bind(this)
  }

  componentDidMount() {
    let competitionId = this.props.competitionId
    if(competitionId) {
      $.ajax({
        url: `/api/competition/${competitionId}/prizes`,
        type: 'GET',
        dataType: 'JSON'
      }).done( prizes => {
        this.props.dispatch({type: 'CURRENT_PRIZES', prizes})
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

  submitEdittedPrize(e, id) {
    e.preventDefault()
    let name = this.refs.editPrizeName.value
    let rank = this.refs.editPrizeRank.value
    $.ajax({
      url: `/api/prizes/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { prize: {
        name: name,
        rank: rank
      }}
    }).done( prize => {
      this.props.dispatch({type: 'UPDATE_CURRENT_PRIZES', prize})
      this.toggleEdit()
    }).fail( data => {

    })
  }

  deletePrize(prize) {
    let confirmed = confirm('Delete Prize?')
    if(confirmed) {
      let id = prize.id
      $.ajax({
        url: `/api/prizes/${id}`,
        type: 'DELETE',
        dataType: 'JSON'
      }).done( prize => {
        this.props.dispatch({type: 'REMOVE_PRIZE', prize})
      }).fail( data => {

      })
    }
  }

  submitPrize(e) {
    e.preventDefault()
    let rank = this.refs.prizeRank.value
    let competitionId = this.props.competitionId
    let name = this.refs.prizeName.value
    $.ajax({
      url: '/api/prizes',
      type: 'POST',
      dataType: 'JSON',
      data: { prize: {
        competition_id: competitionId,
        name: name,
        rank: rank
      }}
    }).done( prize => {
      this.props.dispatch({type: 'ADD_PRIZE', prize})
      this.toggleAdd()
    }).fail( data => {

    })
  }

  setPrize(prize) {
    this.props.dispatch({type: 'CURRENT_PRIZE', prize})
    this.toggleEdit()
  }

  prizeRank(prize) {
    if(prize.rank === '1') {
      return(
        <div>
          1st Place - {prize.name}
        </div>
      )
    } else if(prize.rank === '2') {
      return(
        <div>
          2nd Place - {prize.name}
        </div>
      )
    } else if(prize.rank === '3') {
      return(
        <div>
          3rd Place - {prize.name}
        </div>
      )
    }
  }

  onDrop = (files) => {
    let id = this.props.currentprize.id
    let file = files[0];
    let req = request.put(`/api/prizes/${id}/avatar`);
    req.setCsrfToken();
    req.attach('avatar', file)
    req.end( (err, res) => {
      if(res.body) {
        this.setState({avatar: [res.body.avatar]})
      }
    })
  }

  display() {
    if(this.props.currentprizes.length) {
      return this.props.currentprizes.map( prize => {
        if(this.state.edit) {
          if(prize.id === this.props.currentprize.id) {
            return(
              <div  key={prize.id} className='col s12 m6 l4'>
                <div className='col s12'>
                  <form ref='editPrizeForm' onSubmit={(e) => this.submitEdittedPrize(e, prize.id)}>
                    <div className='col s12 '>
                      <input ref='editPrizeName' style={{fontSize: '15px'}} placeholder={prize.name} defaultValue={prize.name} autoFocus required />
                    </div>
                    <div className="input-field col s12">
                      <select ref='editPrizeRank' defaultValue={prize.rank}>
                        <option value="1">1st Place</option>
                        <option value="2">2nd Place</option>
                        <option value="3">3rd Place</option>
                      </select>
                      <label>Prize Ranking</label>
                    </div>
                    <div className='col s12 center' style={{marginBottom: '10px'}}>
                      <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Update' />
                    </div>
                  </form>
                  <div className='center col s12' style={{marginBottom: '0px'}}>
                    <span onClick={this.toggleEdit} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
                  </div>
                  <div  className='col s12' style={{height: '75px', marginBottom: '15px', position: 'relative', paddingTop: '0px'}}>
                    <div style={{
                      backgroundImage: `url(${prize.avatar})`,
                      width: '100%',
                      height: '100%',
                      maxWidth: '75px',
                      display: 'block',
                      backgroundSize: 'cover',
                      borderRadius: '10px',
                      boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                      margin: '8px auto',
                      backgroundColor: 'rgba(0,0,0,0.25)',
                      zIndex: '1',
                    }}>
                    <DropZone className='edit-icon' style={{
                        backgroundColor: '#aaa',
                        backgroundImage: `url('http://res.cloudinary.com/dk2bj79p0/image/upload/v1487276928/k8l3cfeaxmgdjja4yyah.jpg')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        width: '100%',
                        height: '100%',
                        maxWidth: '75px',
                        display: 'block',
                        borderRadius: '10px',
                        margin: '0px auto',
                        position: 'relative',
                        opacity: '0.75',
                        zIndex: '2',
                        cursor: 'pointer'
                      }} multiple={false} onDrop={this.onDrop} />
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            return(
              <div key={prize.id} className='col s12 m6 l4'>
                <div style={{height: '225px', marginBottom: '10px'}}>
                  <div style={{
                      backgroundImage: `url(${prize.avatar})`,
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
                  {this.prizeRank(prize)}
                  <i className="tiny material-icons edit-icon" onClick={() => this.setPrize(prize)} style={{cursor: 'pointer'}} title='Edit Prize'>edit</i>
                </div>
              </div>
            )
          }
        } else {
          return(
            <div key={prize.id} className='col s12 m6 l4'>
              <div style={{height: '225px', marginBottom: '10px'}}>
                <div style={{
                    backgroundImage: `url(${prize.avatar})`,
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
                {this.prizeRank(prize)}
                <i className="tiny material-icons edit-icon" onClick={() => this.setPrize(prize)} style={{cursor: 'pointer'}} title='Edit Prize'>edit</i>
                <i className="tiny material-icons delete-icon" onClick={() => this.deletePrize(prize)} style={{cursor: 'pointer'}} title='Delete Prize'>delete</i>
              </div>
            </div>
          )
        }
      })
    } else {
      return(
        <div className='center' style={{color: '#bbb'}}>
          No Prizes
        </div>
      )
    }
  }

  displayAdd() {
    if(this.state.add) {
      return(
        <div className="col s12">
          <form className='col s12 m4 offset-m4' onSubmit={this.submitPrize}>
            <div className='col s12'>
              <label>Prize</label>
              <input ref='prizeName' type='text' />
            </div>
            <div className="input-field col s12">
              <select ref='prizeRank'>
                <option value="" disabled selected>Choose Rank</option>
                <option value="1">1st Place</option>
                <option value="2">2nd Place</option>
                <option value="3">3rd Place</option>
              </select>
              <label>Prize Ranking</label>
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
            <span style={{fontSize: '20px'}}>Prizes</span><br/>
            <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: '#60b9e8', fontSize: '15px'}} >+ Add Prize</span>
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
  let { user, assignedcompany, currentcompetition, currentprizes, currentprize } = state
  return { user, assignedcompany, currentcompetition, currentprizes, currentprize }
}

export default connect(mapStateToProps)(CompetitionPrizes)
