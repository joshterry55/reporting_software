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
      return(<option key={region.id} value={region.id} id={`region${region.id}`}>{region.name}</option>);
    });
  }

  regionInfo(currentRegion) {
    let region
    this.props.assignedregions.map( r => {
      if($(`#region${r.id}`).is(':selected') === true) {
        region = r
      }
    })
    if(region) {
      this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
      this.props.dispatch({type: 'CURRENT_REGION', region})
      this.props.dispatch({type: 'RESET_OFFICE_SALES'})
    }
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
        <div className='col s12 center' style={{backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`, fontSize: '20px', height: '68px'}}>
          <div style={{marginTop: '19px', marginBottom: '10px'}}>
            <span style={{fontSize: '20px', color: `${this.props.assignedcompany.secondary_text}`, padding: '10px 30px'}}>
              Office Reports
            </span>
          </div>
        </div>
        <div className = 'col s12 m10 offset-m1' style={{paddingLeft: '0px', paddingRight: '0px'}}>
          {this.adminCheck()}
          <div className='col s12' style={{zIndex: '0', paddingLeft: '0px', paddingRight: '0px'}}>
            <form className='col s10 offset-s1 m6 offset-m3'>
              <br />
              <select ref='user' className='browser-default' style={{backgroundColor: 'white', border: '1px solid #bbb', color: 'black', fontSize: '18px', margin: '0 auto'}} onChange={this.regionInfo}>
                <option defaultValue="" disabled selected style={{textAlign: 'center'}}>Select Region</option>
                {this.showRegions()}
              </select>
            </form>
            <ReportOfficeSelect />
          </div>
        </div>
      </div>
    )
  }
}

// <div className='col s10 offset-s1 m6 offset-m3'>
//   <br />
//   <Dropdown trigger={<Button style={styles.employeeButton}>{regionName}</Button>}>
//     { this.showRegions() }
//   </Dropdown>
// </div>

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
  let { user, assignedregions, currentregion, assignedoffices, currentoffice, assignedcompany } = state
  return { user, assignedregions, currentregion, assignedoffices, currentoffice, assignedcompany }
}

export default connect(mapStateToProps)(ReportRegionSelect)
