import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import CompetitionLeaderboard from './CompetitionLeaderboard'

class CurrentCompetition extends React.Component {
  constructor(props) {
    super(props)

    this.state = {initial: true, competition_id: 0}

    this.prizes = this.prizes.bind(this)
    this.groups = this.groups.bind(this)
    this.prizeModal = this.prizeModal.bind(this)
    this.prizeModalContent = this.prizeModalContent.bind(this)
    this.dateFormat = this.dateFormat.bind(this)
    this.dateString = this.dateString.bind(this)
    this.adminCheck = this.adminCheck.bind(this)
    this.leaderboardStats = this.leaderboardStats.bind(this)
    this.salesman = this.salesman.bind(this)
  }
  //
  // componentDidUpdate() {
  //   let companyId = this.props.assignedcompany.id
  //   debugger
  //   // $.ajax({
  //   //   url: `/api/company/${companyId}/users`,
  //   //   type: 'GET',
  //   //   dataType: 'JSON'
  //   // }).done( users => {
  //   //   this.props.dispatch({ type: 'EMPLOYEES', users })
  //   // }).fail( data => {
  //   //
  //   // })
  // }

  componentDidUpdate() {
    $('.modal').modal();
    let companyId = this.props.assignedcompany.id
    if(this.props.currentcompetition.id === this.state.competition_id) {
      if(!this.state.initial) {

      } else {
        this.setState({initial: false})
      }
    } else {
      if(this.state.initial) {

      } else {
        this.setState({initial: true})
      }
    }
    if(this.state.initial) {
      if(this.props.currentgroups.length) {
        let groupArray = []
        let selection = this.props.currentcompetition.grouped_by
        this.props.currentgroups.map( group => {
          groupArray.push(parseInt(group.group_id))
        })
        let competitionId = this.props.currentcompetition.id
        let employeeTest = this.props.employees
        $.ajax({
          url: `/api/company/${companyId}/comp_users`,
          type: 'GET',
          dataType: 'JSON',
          data: {
            groups: groupArray,
            selection: selection
          }
        }).done( users => {
          this.props.dispatch({ type: 'EMPLOYEES', users })
          this.setState({initial: false, competition_id: competitionId})
        }).fail( data => {

        })
      }
    }
  }

  prizes() {
    if(this.props.currentprizes.length) {
      return(
        <div style={{marginTop: '10px', marginBottom: '10px'}}>
          <button data-target="modal1" style={{color: '#f2f7f7', backgroundColor: '#60b9e8', textShadow: '1px 1px 1px rgba(0,0,0,0.5)'}}>View Prizes</button>
        </div>
      )
    }
  }

  getTotals(group) {
    if(this.props.grouptotals['office']) {
      let selection = this.props.currentcompetition.grouped_by
      let id = parseInt(group.group_id)
      let groups = this.props.grouptotals
      let total = groups[selection][id]
      return(
        <div>
          {total}
        </div>
      )
    }
  }

  prizeModal() {
    return(
      <div className='col s12' style={{padding: '0px'}}>
        <div style={styles.modalHeader} className='center'>
          <span>Prizes</span>
        </div>
        {this.prizeModalContent()}
      </div>
    )
  }

  prizeModalContent() {
    if(this.props.currentprizes.length) {
      return this.props.currentprizes.map( prize => {
        return(
          <div key={prize.id} className='col s12'>
            <div className='col s12 center' style={{marginTop: '20px'}}>
              {this.prizeRank(prize)}
            </div>
            <div className='col s12'>
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
            </div>
          </div>
        )
      })
    }
  }

  prizeRank(prize) {
    if(prize.rank === '1') {
      return(
        <div style={{fontSize: '18px'}}>
          <b>1st Place</b> - {prize.name}
        </div>
      )
    } else if(prize.rank === '2') {
      return(
        <div style={{fontSize: '18px'}}>
          <b>2nd Place</b> - {prize.name}
        </div>
      )
    } else if(prize.rank === '3') {
      return(
        <div style={{fontSize: '18px'}}>
          <b>3rd Place</b> - {prize.name}
        </div>
      )
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

  groups() {
    if(this.props.currentgroups.length) {
      let competition = this.props.currentcompetition
      if(competition.competition_type === 'Team') {
        if(this.props.currentgroups.length >= 3) {
          return this.props.currentgroups.map( group => {
            return(
              <div  key={group.id} className='col s12 m6 l4' style={{marginBottom: '20px'}}>
                <div className='col s8' style={{height: '150px', marginBottom: '10px'}}>
                  <div style={{
                      backgroundImage: `url(${group.avatar})`,
                      width: '100%',
                      height: '100%',
                      maxWidth: '150px',
                      display: 'block',
                      backgroundSize: 'cover',
                      borderRadius: '5px',
                      boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                      margin: '10px auto'
                    }}>
                  </div>
                </div>
                <div className='col s4 center' style={{marginTop: '10px'}}>
                  <span style={{borderBottom: '1px solid #ccc'}}>{group.name}</span>
                  <div className='center' style={{fontSize: '30px'}}>
                    {this.getTotals(group)}
                  </div>
                </div>
              </div>
            )
          })
        } else if(this.props.currentgroups.length === 2) {
          return this.props.currentgroups.map( group => {
            return(
              <div  key={group.id} className='col s12 m6' style={{marginBottom: '20px'}}>
                <div className='col s12' style={{paddingLeft: '20px', paddingRight: '20px'}}>
                  <div className='col s8' style={{height: '150px', marginBottom: '10px'}}>
                    <div style={{
                        backgroundImage: `url(${group.avatar})`,
                        width: '100%',
                        height: '100%',
                        maxWidth: '150px',
                        display: 'block',
                        backgroundSize: 'cover',
                        borderRadius: '5px',
                        boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                        margin: '10px auto'
                      }}>
                    </div>
                  </div>
                  <div className='col s4 center' style={{marginTop: '10px'}}>
                    <span style={{borderBottom: '1px solid #ccc'}}>{group.name}</span>
                    <div className='center' style={{fontSize: '30px'}}>
                      {this.getTotals(group)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        } else if(this.props.currentgroups.length === 1) {
          return this.props.currentgroups.map( group => {
            return(
              <div  key={group.id} className='col s12 m8 offset-m2 l6 offset-l3' style={{marginBottom: '20px'}}>
                <div className='col s6' style={{height: '150px', marginBottom: '10px'}}>
                  <div style={{
                      backgroundImage: `url(${group.avatar})`,
                      width: '100%',
                      height: '100%',
                      maxWidth: '150px',
                      display: 'block',
                      backgroundSize: 'cover',
                      borderRadius: '5px',
                      boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                      margin: '10px auto'
                    }}>
                  </div>
                </div>
                <div className='col s6 center' style={{marginTop: '10px'}}>
                  <span style={{borderBottom: '1px solid #ccc'}}>{group.name}</span>
                  <div className='center' style={{fontSize: '30px'}}>
                    {this.getTotals(group)}
                  </div>
                </div>
              </div>
            )
          })
        }
      }
    }
  }

  adminCheck() {
    let competitionId
    if(this.props.currentcompetition.id) {
      competitionId = this.props.currentcompetition.id
      if(this.props.user.role === 'Admin') {
        return(
          <i className="tiny material-icons edit-icon" style={{cursor: 'pointer'}} title='Edit Prize'><Link to={`/editcompetition/${competitionId}`}>edit</Link></i>
        )
      }
    }
  }

  salesman(user) {
    if(this.props.employees.length) {
      let salesrep
      this.props.employees.map( employee => {
        if(user === employee.id) {
          salesrep = employee
        }
      })
      if(salesrep) {
        return salesrep
      }
    }
  }

  salesmanPicture(picture) {
    return(
      <div className='col s0 l4 hide-on-small-and-down' style={{
        height: '60px',
        width: '60px',
        borderRadius: '5px',
        boxShadow: '0 0 2px rgba(0,0,0,0.35)',
        backgroundImage: `url(${picture})`,
        backgroundSize: 'cover',
        display: 'inline-block',
        marginTop: '10px'
       }}></div>
    )
  }

  leaderboardStats() {
    if(this.props.competitiontotals.length) {
      let salesMan
      return this.props.competitiontotals.map(function(user, i){
        salesMan = this.salesman(user.id)
        if(salesMan) {
          return(
            <tr className='row' style={{height: '80px', lineHeight: '80px', paddingTop: '10px', paddingBottom: '10px'}} key={user.id}>
              <td className='col s2 center'><span style={{fontSize: '20px'}}>{i + 1}</span></td>
              <td className='col s4 center' style={{paddingLeft: '0px'}}>{this.salesmanPicture(salesMan.avatar)} <div className='col s12 m7'><span style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>{salesMan.first_name} {salesMan.last_name}</span></div></td>
              <td className='col s3 center'>Office</td>
              <td className='col s3 center'>{user.site_survey}</td>
            </tr>
          );
        }
      }, this);
    }
  }

  leaderboardTable() {
    return(
      <table className='striped'>
        <thead style={{borderBottom: '1px solid black', height: '35px', lineHeight: '30px'}}>
          <tr className='row'>
            <th className='col s2 center'>Rank</th>
            <th className='col s4 center'>Salesman</th>
            <th className='col s3 center'>Office</th>
            <th className='col s3 center'>Site Surveys</th>
          </tr>
        </thead>
        <tbody id="products">
          {this.leaderboardStats()}
        </tbody>
      </table>
    )
  }

  render() {
    let groups = this.props.currentgroups
    return(
      <div className='row'>
        <div className='col s12 center'>
          <span style={{fontSize: '20px'}}>{this.props.currentcompetition.name} {this.adminCheck()}</span>
          <span style={{fontSize: '15px', marginBottom: '10px'}}>{this.dateFormat(this.props.currentcompetition)}</span>
          {this.prizes()}
          <div style={{height: '30px', backgroundColor: '#ccc', lineHeight: '30px'}}>
            <div className='col s12 m6 center'>
              <span>Competition Type: {this.props.currentcompetition.competition_type}</span>
            </div>
            <div className='col s12 m6 center'>
              <span>Grouped By: {this.props.currentcompetition.grouped_by}</span>
            </div>
          </div>
        </div>
        <div className='col s12' style={{paddingTop: '10px'}}>
          {this.groups()}
        </div>
        <div className='col s12' style={{padding: '20px 0px'}}>
          <div className=' col s12 m10 offset-m1 ' style={{backgroundColor: '#eee', minHeight: '100px', padding: '0px', borderRadius: '5px', border: '1px solid #bbb'}}>
            <div className='col s12 center' style={{height: '40px', backgroundColor: '#bbb', fontSize: '20px', lineHeight: '40px'}}>
              <span>{this.props.currentcompetition.name} Leaderboard</span>
            </div>
            <div className='col s12' style={{maxHeight: '600px', overflow: 'scroll'}}>
              <CompetitionLeaderboard groups={groups}/>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal modal-height" style={styles.modalStyling}>
          {this.prizeModal()}
        </div>
      </div>
    )
  }
}

const styles = {
  modalStyling: {
    width: '80%',
    maxWidth: '500px',
    border: '1px solid #333',
    borderRadius: '10px',
    overflow: 'scroll',
    height: '600px'
  },
  modalFooter: {
    position: 'absolute',
    bottom: '0px',
  },
  modalHeader: {
    width: '100%',
    height: '60px',
    lineHeight: '61px',
    color: '#f2f7f7',
    fontSize: '35px',
    textShadow: '0 0 5px rgba(0,0,0,0.50)',
    backgroundColor: "#60b9e8",
    borderBottom: '1px solid #333',
    boxShadow: '0 0 6px #000',
    position: 'relative',
  },
  tableStyle: {
    minWidth: '700px',

  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, currentcompetition, currentprizes, currentgroups, grouptotals, competitiontotals, employees } = state
  return { user, assignedcompany, currentcompetition, currentprizes, currentgroups, grouptotals, competitiontotals, employees }
}

export default connect(mapStateToProps)(CurrentCompetition)
