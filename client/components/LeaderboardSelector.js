import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Button, NavItem } from 'react-materialize';
import LeaderboardContainer from './LeaderboardContainer'

class LeaderboardSelector extends React.Component {
  constructor(props) {
    super(props)

    this.filterInfo = this.filterInfo.bind(this)
  }

  //
  // showFilters() {
  //   // return(
  //   //       <option value="SS" id="SS">Site Survey</option>
  //   // )
  //   return(
  //     <div>
  //       <option value="SS" id="SS">Site Survey</option>
  //       <option value="KW"  id="KW">KW</option>
  //       <option value="SSKW" id="SSKW">Site Survey KW</option>
  //     </div>
  //   )
  // }

  filterInfo(currentChoice) {
    let choice
    if($(`#KW`).is(':selected') === true) {
      choice = 'KW'
    } else if($(`#SS`).is(':selected') === true) {
      choice = 'SS'
    } else if($(`#SSKW`).is(':selected') === true) {
      choice = 'SSKW'
    }
    if(choice) {
      this.props.dispatch({type: 'CURRENT_FILTER', choice})
    }
  }

  urlCheck(selectName) {
    if(window.location.pathname === '/leaderboards/regions') {
      return(
        <form className='col m2 offset-m5' style={{marginTop: '10px'}}>
          Sort by:
          <select ref='user' className='browser-default' style={{backgroundColor: '#60b9e8', border: '1px solid #bbb', color: '#f2f7f7', textShadow: '1px 1px 1px rgba(0,0,0,0.5)', fontSize: '18px', margin: '0 auto'}} onChange={this.filterInfo}>
            <option value="SS" id="SS">Site Survey</option>
            <option value="SSKW" id="SSKW">Site Survey KW</option>
            <option value="KW"  id="KW">KW</option>
          </select>
        </form>
      )
    } else {
      return(
        <form className='col s12 m2' style={{marginTop: '10px'}}>
          Sort by:
          <select ref='user' className='browser-default' style={{backgroundColor: '#60b9e8', border: '1px solid #bbb', color: '#f2f7f7', textShadow: '1px 1px 1px rgba(0,0,0,0.5)', fontSize: '18px', margin: '0 auto'}} onChange={this.filterInfo}>
              <option value="SS" id="SS">Site Survey</option>
              <option value="SSKW" id="SSKW">Site Survey KW</option>
              <option value="KW"  id="KW">KW</option>
          </select>
        </form>
      )
    }
  }

  // <Dropdown trigger={<Button style={styles.employeeButton}>{selectName}</Button>}>
  //   { this.showFilters() }
  // </Dropdown>

  render() {
    let selectName
    if (this.props.currentfilter.length != 0) {
      selectName = `${this.props.currentfilter}`
    } else {
      selectName = 'KW'
    }
    return(
      <div>
        {this.urlCheck(selectName)}
        <div className='col s12'>
        </div>
        <LeaderboardContainer />
      </div>
    )
  }
}

const styles = {
  employeeButton: {
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    textAlign: 'center',
    lineHeight: '42px',
    width: '100%',
    height: '40px',
    backgroundColor: '#60b9e8',
    color: '#f2f7f7',
    borderRadius: '0',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
  }
}

const mapStateToProps = (state) => {
  let { user, currentregion, currentoffice, assignedoffices, employees, currentfilter } = state
  return { user, currentregion, currentoffice, assignedoffices, employees, currentfilter }
}

export default connect(mapStateToProps)(LeaderboardSelector)
