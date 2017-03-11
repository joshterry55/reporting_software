import React from 'react'
import {connect} from 'react-redux'
import Regions from './Regions'
import Admin from './Admin'

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
          <div className='col s12'>
            <div className='col s12 m4 offset-m4'>
              <form ref='editCompanyForm' onSubmit={(e) => this.submitEdittedCompany(e, company.id)}>
                <div className='col s10'>
                  <input style={{fontSize: '20px'}} ref='newCompanyName' type='text' defaultValue={company.name} required placeholder={company.name} autoFocus/>
                </div>
                <div className='col s2' style={{marginTop: '10px'}}>
                  <button className='btn' type='submit' style={{ borderRadius: '3px', backgroundColor: '#444'}}><i className="tiny material-icons confirm-icon">done</i></button>
                </div>
              </form>
            </div>
          </div>
        )
      } else {
        return(
            <div className="center">
              <div>{company.name} <i className="tiny material-icons confirm-icon" onClick={this.toggleEdit} style={{cursor: 'pointer'}} title='Edit Company'>edit</i></div>
            </div>
        )
      }
    }
  }

  render() {
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
        <div className='col s12 ' style={{marginTop: '10px'}}>
          <Regions />
        </div>
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
