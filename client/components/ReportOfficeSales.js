import React from 'react'
import {connect} from 'react-redux'
import { setFlash } from '../actions/flash';
import { totalsales } from '../actions/totalsales';

class ReportOfficeSales extends React.Component {
  constructor(props) {
    super(props)

    this.totalCheck = this.totalCheck.bind(this)
  }

  componentDidUpdate() {
    this.totalCheck();
  }

  totalCheck() {
    let currentSales = this.props.officesales
		// this.props.dispatch(totalsales(currentSales));
  }

  displaySales() {
    if(this.props.officesales.length) {
      return this.props.officesales.map( sale => {
        return(
            <tr className='row' key={sale.id}>
              <td className='col s3'>{sale.date}</td>
              <td className='col s3'>{sale.first_name} {sale.last_name}</td>
              <td className='col s2'>{sale.kw}</td>
              <td className='col s1'>{sale.sit_down}</td>
              <td className='col s1'>{sale.close}</td>
              <td className='col s1'>{sale.site_survey}</td>
              <td className='col s1'>{sale.cancel}</td>
            </tr>
        );
      });
    }
  }

  // <div key={sale.id}>{sale.first_name} {sale.last_name} {sale.kw}</div>


  render() {
    return(
      <div>
        <table className='striped'>
          <thead>
            <tr className='row'>
                <th className='col s3'>Date</th>
                <th className='col s3'>Customer</th>
                <th className='col s2'>Kw</th>
                <th className='col s1'>SD</th>
                <th className='col s1'>CL</th>
                <th className='col s1'>SS</th>
                <th className='col s1'>CA</th>
            </tr>
          </thead>
          <hr />
          <tbody id="products">
            {this.displaySales()}
            <tr className='row'>
              <td className='col s3'></td>
              <td className='col s3'>0</td>
              <td className='col s2'>0</td>
              <td className='col s1'>3</td>
              <td className='col s1'>3</td>
              <td className='col s1'>3</td>
              <td className='col s1'>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { officesales, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown } = state
  return { officesales, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown }
}

export default connect(mapStateToProps)(ReportOfficeSales)
