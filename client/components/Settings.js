import React from 'react'
import { connect } from 'react-redux'
import Admin from './Admin'


class Settings extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    // if(this.props.params.code) {
    //   debugger
    // }
  }


  render() {
    return(
      <div className='row'>
        <Admin />
        <div className='col s12 m10 offset-m1 white-container' style={{ position: 'relative', zIndex: '-1'}}>
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
