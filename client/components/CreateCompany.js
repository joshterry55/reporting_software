import React from 'react'
import { connect } from 'react-redux'

class CreateCompany extends React.Component {
  constructor(props) {
    super(props)

    this.createCompany = this.createCompany.bind(this)
  }

  createCompany(e) {
    e.preventDefault()
    let name = this.refs.companyName.value
    $.ajax({
      url: '/api/companies',
      type: 'POST',
      dataType: 'JSON',
      data: { company: {
        name: name
      }}
    }).done( company => {
      this.props.dispatch({type: 'ASSIGNED_COMPANY', company})
      this.props.history.push('/company');
    }).fail( data => {
        debugger
    })
  }

  display() {
    return(
      <div>
        <form ref='companyForm' onSubmit={this.createCompany}>
          <input ref='companyName' placeholder='Company Name'/>
          <input type='submit' />
        </form>
      </div>
    )
  }

  render() {
    return(
      <div className='row container white-container'>
        {this.display()}
      </div>
    )
  }
}

export default connect()(CreateCompany)
