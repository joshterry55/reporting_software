import React from 'react'
import { connect } from 'react-redux'
import OfficeSelect from './OfficeSelect'
import { Dropdown, Button, NavItem } from 'react-materialize';

class RegionSelect extends React.Component {
  constructor(props) {
    super(props)

    this.regionInfo = this.regionInfo.bind(this)
  }

  showRegions() {
    return this.props.assignedregions.map( region => {
      return(<NavItem key={region.id} value={region.id} onClick={() => this.regionInfo(region)}>{region.name}</NavItem>);
    });
  }

  regionInfo(region) {
    this.props.dispatch({type: 'CURRENT_REGION', region})
  }

  render() {
    let regionName
    if (this.props.currentregion.name) {
      regionName = `${this.props.currentregion.name}`
    } else {
      regionName = 'Select Region'
    }
    return(
      <div className='row container white-container'>
        <div className='container'>
          <div className='col s12 m4 offset-m4'>
            <br />
            <Dropdown trigger={<Button>{regionName}</Button>}>
              { this.showRegions() }
            </Dropdown>
          </div>
          <br />
          <OfficeSelect />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedregions, currentregion } = state
  return { user, assignedregions, currentregion }
}

export default connect(mapStateToProps)(RegionSelect)
