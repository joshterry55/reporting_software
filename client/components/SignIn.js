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
      this.props.dispatch(officesetup())
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
        <div className='col s12' style={{paddingTop: '75px'}}>
          <h3 className='center' style={{color: '#f2f7f7'}}>Logo</h3>
          <div className='col s12 m6 offset-m3 l4 offset-l4' style={{backgroundColor: 'rgba(200,200,200,0.65)', padding: '20px', borderRadius: '5px'}}>
            <div className='center' style={{position: 'relative', height: '105px'}}>
              <div style={{
                  height: '100px',
                  width: '100px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  boxShadow: '0 0 2px rgba(0,0,0,0.35)',
                  border: '1px solid #000',
                  backgroundImage: `url('http://res.cloudinary.com/dk2bj79p0/image/upload/v1483585049/anonBee_wgbcih.jpg')`,
                  backgroundSize: 'cover'
                }}></div>
            </div>
            <form className='col s12' onSubmit={this.handleSubmit}>
              <label style={{color: 'black'}}>Email</label>
              <input type="email" style={{color: 'black', backgroundColor: '#f2f7f7', borderRadius: '2px'}} required={true} ref='email' placeholder='email' />
              <label style={{color: 'black'}}>Password</label>
              <input type='password' style={{color: 'black', backgroundColor: '#f2f7f7', borderRadius: '2px'}} required={true} ref='password' placeholder='password' />
              <button className='btn' style={{backgroundColor: '#60b9e8'}}>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default connect()(SignIn)
