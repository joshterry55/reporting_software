import React from 'react'
import {connect} from 'react-redux'

class SetWeek extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidUpdate() {
    let weekDates = this.props.date
    this.props.dispatch({type: 'WEEK_DATES', weekDates})
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}


export default connect()(SetWeek)
