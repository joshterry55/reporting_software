import React from 'react'
import {connect} from 'react-redux'
import { setFlash } from '../actions/flash';

class ReportOfficeSales extends React.Component {
  constructor(props) {
    super(props)

  }

  displaySales() {
    if(this.props.officesales.length) {
      return this.props.officesales.map( sale => {
        return(
          <div key={sale.id}>{sale.first_name} {sale.last_name} {sale.kw}</div>
        );
      });
    }
  }

  render() {
    return(
      <div>
        {this.displaySales()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { officesales } = state
  return { officesales }
}

export default connect(mapStateToProps)(ReportOfficeSales)
