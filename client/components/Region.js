import React from 'react'
import {connect} from 'react-redux'

class Region extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let regionId = parseInt(this.props.params.id)
    debugger
  }

  display() {
    return(
      <div>
        REGION
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

const mapStateToProps = (state) => {
  let { user } = state
  return { user }
}

export default connect(mapStateToProps)(Region)
