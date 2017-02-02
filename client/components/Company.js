import React from 'react'
import {connect} from 'react-redux'
import Regions from './Regions'

class Company extends React.Component {
  constructor(props) {
    super(props)

    this.state = { editCompany: false }

    this.toggleEdit = this.toggleEdit.bind(this)
  }

  componentDidMount() {
    if(!this.props.assignedcompany.length) {
      $.ajax({
        url: '/api/companies',
        type: 'GET',
        dataType: 'JSON'
      }).done( company => {
        this.props.dispatch({ type: 'ASSIGNED_COMPANY', company })
      }).fail( data => {
        console.log(data);
      });
    }
  }

  toggleEdit() {
    this.setState({editCompany: !this.state.editCompany})
  }

  submitEdittedCompany(e, id) {
    e.preventDefault()
    $.ajax({
      type: "PUT",
      url: `/api/companies/${id}`,
      dataType: 'JSON',
      data: { company: { name: this.refs.newCompanyName.value }}
    }).success( company => {
      this.props.dispatch({type: 'ASSIGNED_COMPANY', company})
      this.toggleEdit()
    }).fail( data => {
      console.log('failed')
    })
  }

  display() {
    if(this.props.assignedcompany.id) {
      let company = this.props.assignedcompany
      if(this.state.editCompany) {
        return(
          <form ref='editCompanyForm' onSubmit={(e) => this.submitEdittedCompany(e, company.id)}>
            <div>
              <input ref='newCompanyName' type='text' defaultValue={company.name} required placeholder={company.name} autoFocus/>
            </div>
            <div>
              <button type='submit'><i className="tiny material-icons confirm-icon">done</i></button>
            </div>
          </form>
        )
      } else {
        return(
          <div>
            <div>{company.name} <i className="tiny material-icons confirm-icon" onClick={this.toggleEdit} style={{cursor: 'pointer'}} title='Edit Company'>edit</i></div>
          </div>
        )
      }
    }
  }

  render() {
    return(
      <div className='row container white-container'>
        {this.display()}
        <Regions />
      </div>
    )
  }
}

const styles = {
	whiteBottom: {
		position: 'fixed',
		bottom: '0px',
		height: '3000px',
		backgroundColor: '#f2f7f7',
		zIndex: '-1'
	}
}

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(Company)
