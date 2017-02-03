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
    }
  }

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
