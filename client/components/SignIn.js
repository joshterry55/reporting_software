import React from 'react';
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { companysetup, regionsetup, officesetup } from '../actions/companysetup'
import { setFlash } from '../actions/flash'

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let { email, password } = this.refs
    let user = { user: {
      email: email.value,
      password: password.value
    }}

    $.ajax({
      url: '/users/sign_in',
      type: 'POST',
      dataType: 'JSON',
      data: user
    }).done( user => {
      this.props.dispatch(login(user));
      this.props.dispatch(companysetup());
      this.props.dispatch(regionsetup())
      this.props.history.push('/')
    }).fail( err => {
      debugger
      let message = err.responseJSON.error
      this.props.dispatch(setFlash(message, 'error'))
    })
  }

  render() {
    return(
      <div className='row container'>
        <div className='col s12'>
          <h3 className='center' style={{color: '#f2f7f7'}}>Sign In</h3>
          <form className='col s10 offset-s1 m8 offset-m2' onSubmit={this.handleSubmit}>
            <input type="email" required={true} ref='email' placeholder='email' />
            <input type='password' required={true} ref='password' placeholder='password' />
            <button className='btn' style={{backgroundColor: '#60b9e8'}}>Sign In</button>
          </form>
        </div>
      </div>
    )
  }

}

export default connect()(SignIn)
