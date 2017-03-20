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
    this.officeCount = this.officeCount.bind(this)
    this.repCount = this.repCount.bind(this)
  }

  componentDidMount() {
    let companyId = this.props.assignedcompany.id
    $.ajax({
      url: `/api/company/${companyId}/users`,
      type: 'GET',
      dataType: 'JSON'
    }).done( users => {
      this.props.dispatch({type: 'EMPLOYEES', users})
    }).fail( data => {

    })
  }

  componentDidUpdate() {
    this.props.dispatch({type: 'RESET_CURRENT_USER'})
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
                <input className='btn' style={{backgroundColor: `${this.props.assignedcompany.accent_color}`}} type='submit' value='Add' />
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

  officeCount(id) {
    if(this.props.assignedoffices.length) {
      let number = 0
      this.props.assignedoffices.map( office => {
        if(id === office.region_id) {
          number += 1
        }
      })
      return(
        number
      )
    } else {
      return 0
    }
  }

  repCount(id) {
    if(this.props.employees.length) {
      let number = 0
      this.props.employees.map( employee => {
        if(id === employee.region_id) {
          number += 1
        }
      })
      return(
        number
      )
    } else {
      return 0
    }
  }

  displayRegions() {
    if(this.props.assignedregions.length) {
      return this.props.assignedregions.map( region => {
        return(
          <div key={region.id} className='col s12 l6' style={{marginBottom: '20px'}}>
            <Link to={`/region/${region.id}`} className='col s12 region-hover' style={{backgroundColor: '#ddd', borderRadius: '5px', border: '1px solid #ccc', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '5px'}}>
              <div className='col s6 l7'>
                <div style={{height: '200px', marginBottom: '10px'}}>
                  <div style={{
                      backgroundImage: `url(${region.avatar})`,
                      width: '100%',
                      height: '100%',
                      maxWidth: '200px',
                      display: 'block',
                      backgroundSize: 'cover',
                      borderRadius: '5px',
                      boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                      margin: '10px auto'
                    }}>
                  </div>
                </div>
              </div>
              <div className='col s6 l5' style={{paddingTop: '15px'}}>
                <span style={{fontSize: '20px', color: 'black'}}>{region.name}</span><br />
                <span style={{color: 'black'}}>Office Count: {this.officeCount(region.id)}</span><br />
                <span style={{color: 'black'}}>Rep Count: {this.repCount(region.id)}</span><br />
              </div>
            </Link>
          </div>
        );
      });
    }
  }


  render() {
    return(
      <div>
        {this.display()}
        <div className='col s12' style={{marginTop: '20px'}}>
          {this.displayRegions()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedregions, assignedcompany, assignedoffices, employees } = state
  return { user, assignedregions, assignedcompany, assignedoffices, employees }
}

export default connect(mapStateToProps)(Regions)
