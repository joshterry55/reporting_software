import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReportOfficeSelect from './ReportOfficeSelect'
import { Dropdown, Button, NavItem } from 'react-materialize';

class ReportRegionSelect extends React.Component {
  constructor(props) {
    super(props)

    this.regionInfo = this.regionInfo.bind(this)
    this.adminCheck = this.adminCheck.bind(this)
  }

  showRegions() {
    return this.props.assignedregions.map( region => {
      return(<NavItem key={region.id} value={region.id} onClick={() => this.regionInfo(region)}>{region.name}</NavItem>);
    });
  }

  regionInfo(region) {
    this.props.dispatch({type: 'CURRENT_REGION', region})
    this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
    this.props.dispatch({type: 'RESET_OFFICE_SALES'})
  }

  adminCheck() {
    if(this.props.user.role === 'Admin') {
      return(
        <div className='col s12' style={{zIndex: 2, marginBottom: '-15px', position: 'relative'}}>
          <span className='col s12 m3 offset-m9' style={{textAlign: 'right', paddingTop: '10px'}} ><Link className='add-sale' to='/addsale'>+ Add Sale</Link></span>
        </div>
      )
    } else {
      return(
        <div>

        </div>
      )
    }
  }

  render() {
    let regionName
    if (this.props.currentregion.name) {
      regionName = `${this.props.currentregion.name}`
    } else {
      regionName = 'Select Region'
    }
    return(
      <div className='row'>
        <div className='col s12 center' style={{backgroundColor: '#ccc', fontSize: '20px'}}>
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
            Office Reports
          </div>
        </div>
        <div className = 'col s12 m10 offset-m1' style={{paddingLeft: '0px', paddingRight: '0px'}}>
          {this.adminCheck()}
          <div className='col s12' style={{zIndex: '0', paddingLeft: '0px', paddingRight: '0px'}}>
            <div className='col s10 offset-s1 m6 offset-m3'>
              <br />
              <Dropdown trigger={<Button style={styles.employeeButton}>{regionName}</Button>}>
                { this.showRegions() }
              </Dropdown>
            </div>
            <ReportOfficeSelect />
          </div>
        </div>
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
  let { user, assignedregions, currentregion } = state
  return { user, assignedregions, currentregion }
}

export default connect(mapStateToProps)(ReportRegionSelect)
