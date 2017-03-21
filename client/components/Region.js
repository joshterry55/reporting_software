import React from 'react'
import {connect} from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { setFlash } from '../actions/flash';
import Admin from './Admin'

class Region extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addOffice: false }
    this.state = { editRegion: false }

    this.createOffice = this.createOffice.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.displayOffices = this.displayOffices.bind(this)
    this.repCount = this.repCount.bind(this)
  }

  componentDidMount() {
    let regionId = parseInt(this.props.params.id)
    return this.props.assignedregions.map( region => {
      if(region.id === regionId) {
        this.props.dispatch({type: 'CURRENT_REGION', region })
      }
      let companyId = this.props.assignedcompany.id
      $.ajax({
        url: `/api/company/${companyId}/users`,
        type: 'GET',
        dataType: 'JSON'
      }).done( users => {
        this.props.dispatch({type: 'EMPLOYEES', users})
      }).fail( data => {

      })
    });
  }

  createOffice(e) {
    e.preventDefault()
    let name = this.refs.officeName.value
    let regionId = this.props.currentregion.id
    let companyId = this.props.assignedcompany.id
    $.ajax({
      url: '/api/offices',
      type: 'POST',
      dataType: 'JSON',
      data: { office: {
        name: name,
        region_id: regionId,
        company_id: companyId
      }}
    }).done( office => {
      this.props.dispatch({type: 'ADD_ASSIGNED_OFFICE', office})
      this.refs.officeForm.reset()
      this.toggleAdd()
    }).fail( data => {
      debugger
    })
  }

  toggleAdd() {
    this.setState({addOffice: !this.state.addOffice})
  }

  displayAdd() {
    if(this.state.addOffice) {
      return(
        <div className='col s12'>
          <div className='col s12 m4 offset-m4'>
            <form ref='officeForm' onSubmit={this.createOffice}>
              <div className='col s10'>
                <input ref='officeName' placeholder='Office Name' autoFocus/>
              </div>
              <div className='col s2'>
                <input className='btn' style={{backgroundColor: `${this.props.assignedcompany.accent_color}`, color: `${this.props.assignedcompany.accent_text}`}} type='submit' />
              </div>
            </form>
            <div className='center col s12' style={{marginBottom: '10px'}}>
              <span className='cancel' onClick={this.toggleAdd} style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className='center'>
          <span onClick={this.toggleAdd} style={{cursor: 'pointer', color: '#60b9e8'}} className='add-sale'>+ Add Office</span>
        </div>
      )
    }
  }

  repCount(id) {
    if(this.props.employees.length) {
      let number = 0
      this.props.employees.map( employee => {
        if(id === employee.office_id) {
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

  displayOffices() {
    if(this.props.assignedoffices.length) {
      return this.props.assignedoffices.map( office => {
        if(this.props.currentregion.id === office.region_id) {
          return(
            <div key={office.id} className='col s12 l6' style={{marginBottom: '20px'}}>
              <Link to={`/office/${office.id}`} className='col s12 region-hover' style={{backgroundColor: '#ddd', borderRadius: '5px', border: '1px solid #ccc', paddingTop: '10px', paddingBottom: '10px', paddingLeft: '5px'}}>
                <div className='col s6 l7'>
                  <div style={{height: '200px', marginBottom: '10px'}}>
                    <div style={{
                        backgroundImage: `url(${office.avatar})`,
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
                  <span style={{fontSize: '20px', color: 'black'}}>{office.name}</span><br />
                  <span style={{color: 'black'}}>Rep Count: {this.repCount(office.id)}</span><br />
                </div>
              </Link>
            </div>
          );
        }
      });
    }
  }

  // <div key={office.id}><Link to={`/office/${office.id}`}>{office.name}</Link></div>


  toggleEdit() {
    this.setState({editRegion: !this.state.editRegion})
  }

  submitEdittedRegion(e, id) {
    e.preventDefault()
    $.ajax({
      type: "PUT",
      url: `/api/regions/${id}`,
      dataType: 'JSON',
      data: { region: { name: this.refs.newRegionName.value }}
    }).success( region => {
      this.props.dispatch({type: 'CURRENT_REGION', region})
      this.props.dispatch({type: 'UPDATE_ASSIGNED_REGION', region})
      this.toggleEdit()
    }).fail( data => {
      console.log('failed')
    })
  }

  deleteRegion(id) {
    let confirmed = confirm("Are you sure you want to delete this Region? Doing so will delete all offices and employees.")
    if(confirmed) {
      $.ajax({
        type: "DELETE",
        url: `/api/regions/${id}`,
        dataType: 'JSON'
      }).success( region => {
        browserHistory.push('/company');
        this.props.dispatch({type: 'REMOVE_ASSIGNED_REGION', region})
        this.props.dispatch({type: 'REMOVE_CURRENT_REGION'})
        let messageSuccess = `${region.name} deleted`
        this.props.dispatch(setFlash(messageSuccess, 'success'))
      }).fail( data => {
        console.log('failed')
      })
    }
  }

  display() {
    let region = this.props.currentregion
    if(this.state.editRegion){
      return(
        <div className='col s12'>
          <div className='col s12 m4 offset-m4'>
            <form ref='editRegionForm' onSubmit={(e) => this.submitEdittedRegion(e, region.id)}>
              <div className='col s10'>
                <input  style={{fontSize: '20px'}} ref='newRegionName' type='text' defaultValue={region.name} required placeholder={region.name} autoFocus />
              </div>
              <div className='col s2' style={{marginTop: '10px'}}>
                <button type='submit' className='btn' style={{ borderRadius: '3px', backgroundColor: `${this.props.assignedcompany.accent_color}`, color: `${this.props.assignedcompany.accent_text}`}}><i className="tiny material-icons confirm-icon">done</i></button>
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return(
        <div className="center">
          <div>{region.name} <i className="tiny material-icons confirm-icon" onClick={this.toggleEdit} style={{cursor: 'pointer'}} title='Edit Company'>edit</i><i style={{cursor: 'pointer'}} className="tiny material-icons delete-icon" title="Delete Region" onClick={() => this.deleteRegion(region.id)}>delete</i></div>
        </div>
      )
    }
  }


  render() {
    let region = this.props.currentregion
    return(
      <div className='row'>
        <Admin />
          <div className='col s12 center' style={{backgroundColor: '#ccc'}}>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
              <span style={{fontSize: '20px'}}>
                {this.display()}
              </span>
            </div>
          </div>
        <div className='col s12' style={{marginTop: '10px'}}>

          {this.displayAdd()}
          <div style={{marginTop: '20px'}}>
            {this.displayOffices()}
          </div>
        </div>
      </div>
    )
  }
}

// <div style={{height: '200px', marginBottom: '10px'}}>
//   <div style={{
//       backgroundImage: `url(${region.avatar})`,
//       width: '100%',
//       height: '100%',
//       maxWidth: '250px',
//       display: 'block',
//       backgroundSize: 'cover',
//       borderRadius: '5px',
//       boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
//       margin: '10px auto'
//     }}>
//   </div>
// </div>

const mapStateToProps = (state) => {
  let { user, assignedregions, currentregion, assignedoffices, assignedcompany, employees } = state
  return { user, assignedregions, currentregion, assignedoffices, assignedcompany, employees }
}


export default connect(mapStateToProps)(Region)
