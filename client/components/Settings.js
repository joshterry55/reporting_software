import React from 'react'
import { connect } from 'react-redux'


class Settings extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {
    return(
      <div className='row'>
        <div className='col s12 m10 offset-m1 white-container'>
          Settings
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(Settings)
