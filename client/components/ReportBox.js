import React from 'react'
import { connect } from 'react-redux'
import { totalsales } from '../actions/totalsales';

class ReportBox extends React.Component {
  constructor(props) {
    super(props)

    this.totalCheck = this.totalCheck.bind(this)
  }

  componentDidUpdate() {
    if(this.props.officesales.length) {
      this.totalCheck();
    } else {
      this.props.dispatch({type: 'RESET_KW'})
      this.props.dispatch({type: 'RESET_SIT_DOWN'})
      this.props.dispatch({type: 'RESET_CLOSE'})
      this.props.dispatch({type: 'RESET_SITE_SURVEY'})
      this.props.dispatch({type: 'RESET_CANCEL'})
    }
  }

  // TODO remember to check the component did update to find a better way, i know its redundant at the moment

  totalCheck() {
    let currentSales = this.props.officesales
    this.props.dispatch(totalsales(currentSales));
  }

  render() {

    return(
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	let { setdate, currentoffice, officesales } = state;
  return { setdate, currentoffice, officesales }
}

export default connect(mapStateToProps)(ReportBox)
