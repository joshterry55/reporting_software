import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

class CompetitionPrizes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false, add: false}

    this.submitEdittedPrize = this.submitEdittedPrize.bind(this)
    this.submitPrize = this.submitPrize.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
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

  submitEdittedPrize(e) {
    e.preventDefault()

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

  display() {
    if(this.props.currentprizes.length) {
      return this.props.currentprizes.map( prize => {
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
              {prize.name}
            </div>
          </div>
        )
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
              <label>Materialize Select</label>
            </div>
            <div className='col s12 center'>
              <input type='submit' className='btn' style={{backgroundColor: '#60b9e8', textShadow: '1px 1px 1px rgba(0,0,0,0.5)'}} />
            </div>
          </form>
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
            <span onClick={this.toggleAdd} style={{fontSize: '15px', cursor: 'pointer'}}>+ Add Prize</span>
          </div>
          {this.displayAdd()}
          {this.display()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, currentcompetition, currentprizes } = state
  return { user, assignedcompany, currentcompetition, currentprizes }
}

export default connect(mapStateToProps)(CompetitionPrizes)
