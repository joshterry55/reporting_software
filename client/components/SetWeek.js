import React from 'react'
import {connect} from 'react-redux'

class SetWeek extends React.Component {
  constructor(props) {
    super(props)

    this.setWeek = this.setWeek.bind(this)
  }

  setWeek(weekDates) {
    this.props.dispatch({type: 'WEEK_DATES', weekDates})
  }

  render() {
    let weekDates = this.props.date
    return(
      <div>
        {this.setWeek(weekDates)}
      </div>
    )
  }
}


export default connect()(SetWeek)
