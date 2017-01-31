import React from 'react'

class Company extends React.Component {
  constructor(props) {
    super(props)

    this.createCompany = this.createCompany.bind(this)
  }

  createCompany(e) {
    e.preventDefault()
    debugger
    let name = this.refs.companyName.value
    $.ajax({
      url: '/api/companies',
      type: 'POST',
      dataType: 'JSON',
      data: { company: {
        name: name
      }}
    }).done( company => {
        debugger
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
      <div>
        {this.display()}
      </div>
    )
  }
}

export default Company
