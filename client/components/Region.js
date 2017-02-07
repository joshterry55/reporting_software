import React from 'react'
import {connect} from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { setFlash } from '../actions/flash';

class Region extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addOffice: false }
    this.state = { editRegion: false }

    this.createOffice = this.createOffice.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.displayOffices = this.displayOffices.bind(this)
  }

  componentDidMount() {
    let regionId = parseInt(this.props.params.id)
    return this.props.assignedregions.map( region => {
      if(region.id === regionId) {
        this.props.dispatch({type: 'CURRENT_REGION', region })
      }
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
        <div>
          <form ref='officeForm' onSubmit={this.createOffice}>
            <input ref='officeName' placeholder='Office Name' autoFocus/>
            <input type='submit' />
          </form>
          <button onClick={this.toggleAdd}>Cancel</button>
        </div>
      )
    } else {
      return(
        <button onClick={this.toggleAdd}>Add Office</button>
      )
    }
  }

  displayOffices() {
    if(this.props.assignedoffices.length) {
      return this.props.assignedoffices.map( office => {
        if(this.props.currentregion.id === office.region_id) {
          return(
            <div key={office.id}><Link to={`/office/${office.id}`}>{office.name}</Link></div>
          );
        }
      });
    }
  }

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
        <form ref='editRegionForm' onSubmit={(e) => this.submitEdittedRegion(e, region.id)}>
          <div>
            <input ref='newRegionName' type='text' defaultValue={region.name} required placeholder={region.name} autoFocus />
          </div>
          <div>
            <button type='submit'><i className="tiny material-icons confirm-icon">done</i></button>
          </div>
        </form>
      )
    } else {
      return(
        <div>
          <div>{region.name} <i className="tiny material-icons confirm-icon" onClick={this.toggleEdit} style={{cursor: 'pointer'}} title='Edit Company'>edit</i><i style={{cursor: 'pointer'}} className="tiny material-icons delete-icon" title="Delete Region" onClick={() => this.deleteRegion(region.id)}>delete</i></div>
        </div>
      )
    }
  }


  render() {
    return(
      <div className='row container white-container'>
        {this.display()}
        {this.displayAdd()}
        <div className='collection'>
          {this.displayOffices()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedregions, currentregion, assignedoffices, assignedcompany } = state
  return { user, assignedregions, currentregion, assignedoffices, assignedcompany }
}


export default connect(mapStateToProps)(Region)
