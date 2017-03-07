import React from 'react'
import { connect } from 'react-redux'

class CurrentCompetition extends React.Component {
  constructor(props) {
    super(props)

    this.prizes = this.prizes.bind(this)
  }

  componentDidMount() {
  }

  prizes() {
    if(this.props.currentprizes.length) {
      return(
        <div>
          these are the prizes:
          
        </div>
      )
    }
  }

  render() {
    return(
      <div className='row'>
        {this.prizes()}
        {this.props.currentcompetition.name}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, currentcompetition, currentprizes } = state
  return { user, assignedcompany, currentcompetition, currentprizes }
}

export default connect(mapStateToProps)(CurrentCompetition)
