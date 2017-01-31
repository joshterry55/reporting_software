import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    let first_name = this.refs.first_name.value
    let last_name = this.refs.last_name.value
    let email = this.refs.email.value
    let password = this.refs.password.value
    let password_confirmation = this.refs.password_confirmation.value
    let role = 'Admin'
    debugger
    $.ajax({
      url: '/users',
      type: 'POST',
      data: { user: {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
        role
      }},
      dataType: 'JSON'
    }).done( user => {
      this.props.dispatch(login(user))
      this.props.history.push('/')
    }).fail( err => {
      debugger
    })
  }


  render() {
    return(
      <div className='row container'>
        <div className='col s12 m10 offset-m1' style={styles.signUpBox}>
          <h3 className='center'>Sign Up</h3>
          <form className='col s10 offset-s1 m8 offset-m2' onSubmit={this.handleSubmit}>
            <input placeholder='first name' ref='first_name' required={true} />
            <input placeholder='last name' ref='last_name' required={true} />
            <input type='email' placeholder='email' ref='email' required={true} />
            <input type='password' placeholder='password' ref='password' required={true} />
            <input type='password' placeholder='password confirmation' ref='password_confirmation' required={true} />
            <button className='btn' style={styles.button}>Sign Up</button>
          </form>
        </div>
      </div>
    )
  }
}

const styles = {
  signUpBox: {
    backgroundColor: '#f2f7f7',
    borderRadius: '15px',
    boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
    padding: '5px 5px 35px 5px',
    marginTop: '50px',
  },
  button: {
    backgroundColor: '#60b9e8'
  }

}
// backgroundImage: 'url("http://res.cloudinary.com/dupyswzaa7/image/upload/v1483750352/beeAccent_l5fh3h.png")',
// backgroundRepeat: 'no-repeat',
// backgroundPosition: 'bottom right'

export default connect()(SignUp)
