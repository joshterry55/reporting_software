import React from 'react'
import { connect } from 'react-redux'
import { currentregion } from '../actions/currentregion'
import { Link, browserHistory } from 'react-router'
import { setFlash } from '../actions/flash';

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
        <form ref='editOfficeForm' onSubmit={(e) => this.submitEdittedOffice(e, office.id)}>
          <div>
            <input ref='newOfficeName' type='text' defaultValue={office.name} required placeholder={office.name} autoFocus />
          </div>
          <div>
            <button type='submit'><i className="tiny material-icons confirm-icon">done</i></button>
          </div>
        </form>
      )
    } else {
      return(
        <div>
          <div>{office.name} <i className="tiny material-icons confirm-icon" onClick={this.toggleEdit} style={{cursor: 'pointer'}} title='Edit Office'>edit</i><i style={{cursor: 'pointer'}} className="tiny material-icons delete-icon" title="Delete Region" onClick={() => this.deleteOffice(office.id)}>delete</i></div>
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.display()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { assignedoffices, currentoffice, currentregion } = state
  return { assignedoffices, currentoffice, currentregion }
}

export default connect(mapStateToProps)(Office)
