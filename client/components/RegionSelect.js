import React from 'react'
import { connect } from 'react-redux'
import OfficeSelect from './OfficeSelect'
import { Dropdown, Button, NavItem } from 'react-materialize';
import Admin from './Admin'

class RegionSelect extends React.Component {
  constructor(props) {
    super(props)

    this.regionInfo = this.regionInfo.bind(this)
  }

  showRegions() {
    return this.props.assignedregions.map( region => {
      return(<option key={region.id} value={region.id} id={`regionAdd${region.id}`}>{region.name}</option>);
    });
  }

  regionInfo(currentRegion) {
    let region
    this.props.assignedregions.map( r => {
      if($(`#regionAdd${r.id}`).is(':selected') === true) {
        region = r
      }
    })
    if(region) {
      this.props.dispatch({type: 'CURRENT_REGION', region})
      this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
      this.props.dispatch({type: 'RESET_EMPLOYEE'})
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
        <Admin />

        <div className='col s12 m10 offset-m1 white-container'>
          <div className='container'>
            <form className='col s10 offset-s1 m8 offset-m2' style={{marginTop: '20px'}}>
              <select ref='user' className='browser-default' style={{backgroundColor: 'white', border: '1px solid #bbb', color: 'black', fontSize: '18px', margin: '0 auto'}} onChange={this.regionInfo}>
                <option defaultValue="" selected style={{textAlign: 'center'}}>Select Region</option>
                {this.showRegions()}
              </select>
            </form>
            <br />
            <OfficeSelect />
          </div>
        </div>
      </div>
    )
  }
}

// <Dropdown trigger={<Button style={styles.employeeButton}>{regionName}</Button>}>
//   { this.showRegions() }
// </Dropdown>

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

export default connect(mapStateToProps)(RegionSelect)
