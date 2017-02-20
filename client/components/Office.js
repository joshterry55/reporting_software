import React from 'react'
import { connect } from 'react-redux'
import { currentregion } from '../actions/currentregion'
import { Link, browserHistory } from 'react-router'
import { setFlash } from '../actions/flash';
import Employees from './Employees'

class Office extends React.Component {
  constructor(props) {
    super(props)

    this.state = { editOffice: false }

    this.toggleEdit = this.toggleEdit.bind(this)
  }

  componentDidMount() {
    let officeId = parseInt(this.props.params.id)
    return this.props.assignedoffices.map( office => {
      if(office.id === officeId) {
        let regionId = office.region_id
        this.props.dispatch({type: 'CURRENT_OFFICE', office })
        this.props.dispatch(currentregion(regionId))
      }
    });
  }

  toggleEdit() {
    this.setState({editOffice: !this.state.editOffice})
  }

  submitEdittedOffice(e, id) {
    e.preventDefault()
    $.ajax({
      type: "PUT",
      url: `/api/offices/${id}`,
      dataType: 'JSON',
      data: { office: { name: this.refs.newOfficeName.value }}
    }).success( office => {
      this.props.dispatch({type: 'CURRENT_OFFICE', office})
      this.props.dispatch({type: 'UPDATE_ASSIGNED_OFFICE', office})
      this.toggleEdit()
    }).fail( data => {
      console.log('failed')
    })
  }

  deleteOffice(id) {
    let confirmed = confirm("Are you sure you want to delete this Office? Doing so will delete all employees belonging to this office.")
    if(confirmed) {
      $.ajax({
        type: "DELETE",
        url: `/api/offices/${id}`,
        dataType: 'JSON'
      }).success( office => {
        browserHistory.push(`/region/${this.props.currentregion.id}`);
        this.props.dispatch({type: 'REMOVE_ASSIGNED_OFFICE', office})
        this.props.dispatch({type: 'REMOVE_CURRENT_OFFICE'})
        let messageSuccess = `${office.name} deleted`
        this.props.dispatch(setFlash(messageSuccess, 'success'))
      }).fail( data => {
        console.log('failed')
      })
    }
  }

  display() {
    let office = this.props.currentoffice
    if(this.state.editOffice){
      return(
        <div className='col s12'>
          <div className='col s12 m4 offset-m4'>
            <form ref='editOfficeForm' onSubmit={(e) => this.submitEdittedOffice(e, office.id)}>
              <div className='col s10'>
                <input ref='newOfficeName' style={{fontSize: '30px'}} type='text' defaultValue={office.name} required placeholder={office.name} autoFocus />
              </div>
              <div className='col s2' style={{marginTop: '10px'}}>
                <button type='submit' className='btn' style={{ borderRadius: '3px', backgroundColor: '#444'}}><i className="tiny material-icons confirm-icon">done</i></button>
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return(
        <div className='center'>
          <div style={{fontSize: '35px', paddingTop: '10px'}}>{office.name} <i className="tiny material-icons confirm-icon" onClick={this.toggleEdit} style={{cursor: 'pointer'}} title='Edit Office'>edit</i><i style={{cursor: 'pointer'}} className="tiny material-icons delete-icon" title="Delete Region" onClick={() => this.deleteOffice(office.id)}>delete</i></div>
        </div>
      )
    }
  }

  render() {
    let officeId = parseInt(this.props.params.id)
    return(
      <div className='row'>
        <div className='col s12 m10 offset-m1 white-container'>
          {this.display()}
          <Employees urlParams={officeId}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { assignedoffices, currentoffice, currentregion } = state
  return { assignedoffices, currentoffice, currentregion }
}

export default connect(mapStateToProps)(Office)
