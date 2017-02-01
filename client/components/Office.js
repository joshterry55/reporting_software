import React from 'react'
import { connect } from 'react-redux'
import { currentregion } from '../actions/currentregion'

class Office extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let officeId = parseInt(this.props.params.id)
    return this.props.assignedoffices.map( office => {
      if(office.id === officeId) {
        let regionId = office.region_id
        this.props.dispatch({type: 'CURRENT_OFFICE', office })
        this.props.dispatch(currentregion(regionId))
      }
    });
  }

  render() {
    return(
      <div>
        Office Page
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { assignedoffices } = state
  return { assignedoffices }
}

export default connect(mapStateToProps)(Office)
