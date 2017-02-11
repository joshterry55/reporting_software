import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

class Regions extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addRegion: false }

    this.createRegion = this.createRegion.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.displayRegions = this.displayRegions.bind(this)
  }

  createRegion(e) {
    e.preventDefault()
    let name = this.refs.regionName.value
    let companyId = this.props.assignedcompany.id
    $.ajax({
      url: '/api/regions',
      type: 'POST',
      dataType: 'JSON',
      data: { region: {
        name: name,
        company_id: companyId
      }}
    }).done( region => {
      this.props.dispatch({type: 'ADD_ASSIGNED_REGION', region})
      this.refs.regionForm.reset()
      this.toggleAdd()
    }).fail( data => {
    })
  }

  toggleAdd() {
    this.setState({addRegion: !this.state.addRegion})
  }

  display() {
    if(this.state.addRegion) {
      return(
        <div className='col s12'>
          <div className='col s12 m4 offset-m4'>
            <form ref='regionForm' onSubmit={this.createRegion}>
              <div className='col s10 '>
                <input ref='regionName' placeholder='Region Name' autoFocus required />
              </div>
              <div className='col s2'>
                <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Add' />
              </div>
            </form>
            <div className='center col s12' style={{marginBottom: '10px'}}>
              <span onClick={this.toggleAdd} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="center">
          <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: '#60b9e8'}}>+ Add Region</span>
        </div>
      )
    }
  }

  displayRegions() {
    if(this.props.assignedregions.length) {
      return this.props.assignedregions.map( region => {
        return(
          <div key={region.id}><Link to={`/region/${region.id}`}>{region.name}</Link></div>
        );
      });
    }
  }


  render() {
    return(
      <div>
        {this.display()}
        <div className='collection'>
          {this.displayRegions()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedregions, assignedcompany } = state
  return { user, assignedregions, assignedcompany }
}

export default connect(mapStateToProps)(Regions)
