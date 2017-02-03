import React from 'react'
import {connect} from 'react-redux'
import { setFlash } from '../actions/flash';
import { totalsales } from '../actions/totalsales';

class ReportOfficeSales extends React.Component {
  constructor(props) {
    super(props)

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
    let kilowatts = 0
    let sitdown = 0
    let close = 0
    let cancel = 0
    let sitesurvey = 0
    if(this.props.currentoffice.id) {
      kilowatts = this.props.officetotalkw['KW'].toFixed(2)
      sitdown = this.props.officetotalsitdown['SD']
      close = this.props.officetotalclose['CL']
      cancel = this.props.officetotalcancel['CA']
      sitesurvey = this.props.officetotalsitesurvey['SS']
    }
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
              <td className='col s3'><b>TOTAL:</b></td>
              <td className='col s3'></td>
              <td className='col s2'>{kilowatts}</td>
              <td className='col s1'>{sitdown}</td>
              <td className='col s1'>{close}</td>
              <td className='col s1'>{sitesurvey}</td>
              <td className='col s1'>{cancel}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { officesales, currentoffice, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown } = state
  return { officesales, currentoffice, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown }
}

export default connect(mapStateToProps)(ReportOfficeSales)
