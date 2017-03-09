import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

class CompetitionLeaderboard extends React.Component {
  constructor(props) {
    super(props)

    this.leaderboardStats = this.leaderboardStats.bind(this)
    this.salesman = this.salesman.bind(this)
  }

  componentDidUpdate() {

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
    if(this.props.currentgroups.length) {
      if(this.props.competitiontotals.length) {
        let salesMan
        let ranked = 0
        return this.props.competitiontotals.map(function(user, i){
          salesMan = this.salesman(user.id)
          if(salesMan) {
            if(ranked === 0) {
              ranked = 1
            } else {
              ranked = (1 + parseInt(ranked))
            }
            return(
              <tr className='row' style={{height: '80px', lineHeight: '80px', paddingTop: '10px', paddingBottom: '10px'}} key={user.id}>
                <td className='col s2 center'><span style={{fontSize: '20px'}}>{ranked}</span></td>
                <td className='col s4 center' style={{paddingLeft: '0px'}}>{this.salesmanPicture(salesMan.avatar)} <div className='col s12 m7'><span style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>{salesMan.first_name} {salesMan.last_name}</span></div></td>
                <td className='col s3 center'>Office</td>
                <td className='col s3 center'>{user.site_survey}</td>
              </tr>
            );
          }
        }, this);
      }
    } else {
      return(
        <div className='col s12 center' style={{marginTop: '20px',}}>
          No teams set up
        </div>
      )
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
    return(
      <div className='row'>
        {this.leaderboardTable()}
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
  let { user, assignedcompany, currentcompetition, currentgroups, grouptotals, competitiontotals, employees } = state
  return { user, assignedcompany, currentcompetition, currentgroups, grouptotals, competitiontotals, employees }
}

export default connect(mapStateToProps)(CompetitionLeaderboard)
