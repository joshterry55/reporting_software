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
        {this.props.currentoffice.name}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { assignedoffices, currentoffice } = state
  return { assignedoffices, currentoffice }
}

export default connect(mapStateToProps)(Office)
