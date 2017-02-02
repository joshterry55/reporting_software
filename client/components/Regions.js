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
    let companyId = this.props.user.assigned_company[0].id
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
        <div>
          <form ref='regionForm' onSubmit={this.createRegion}>
            <input ref='regionName' placeholder='Region Name' autoFocus />
            <input type='submit' />
          </form>
          <button onClick={this.toggleAdd}>Cancel</button>
        </div>
      )
    } else {
      return(
        <button onClick={this.toggleAdd}>Add Region</button>
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
  let { user, assignedregions } = state
  return { user, assignedregions }
}

export default connect(mapStateToProps)(Regions)
