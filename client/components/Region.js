import React from 'react'
import {connect} from 'react-redux'

class Region extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let regionId = parseInt(this.props.params.id)
    return this.props.assignedregions.map( region => {
      if(region.id === regionId) {
        this.props.dispatch({type: 'CURRENT_REGION', region })
      }
    });
  }

  display() {
    return(
      <div>
        {this.props.currentregion.name}
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
  let { user, assignedregions, currentregion } = state
  return { user, assignedregions, currentregion }
}

export default connect(mapStateToProps)(Region)
