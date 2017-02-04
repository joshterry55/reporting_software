import React from 'react'
import {connect} from 'react-redux'
import { setFlash } from '../actions/flash';
import { totalsales } from '../actions/totalsales';

class ReportOfficeSales extends React.Component {
  constructor(props) {
    super(props)

    this.editSale = this.editSale.bind(this)
    this.deleteSale = this.deleteSale.bind(this)
  }

  // truePerc(sale) {
  //   let siteSurvey = sale.site_survey
  //   let sitDown = sale.sit_down
  //   if(sitDown === 0) {
  //     return(
  //       0
  //     )
  //   } else if(siteSurvey === 0) {
  //     return(
  //       0
  //     )
  //   } else {
  //     debugger
  //     return(
  //     (siteSurvey / sitDown)
  //     )
  //   }
  //
  // }
  //
  // cancelPerc(sale) {
  //   debugger
  // }

  editSale(sale) {

  }

  deleteSale(sale) {

  }


  displaySales() {
    if(this.props.officesales.length) {
      return this.props.officesales.map( sale => {
        return(
            <tr className='row' key={sale.id}>
              <td className='col s2'>{sale.date}</td>
              <td className='col s2'>{sale.first_name} {sale.last_name}</td>
              <td className='col s2'>{sale.kw}</td>
              <td className='col s1'>{sale.sit_down}</td>
              <td className='col s1'>{sale.close}</td>
              <td className='col s1'>{sale.site_survey}</td>
              <td className='col s1'>{sale.cancel}</td>
              <td className='col s1 edit-icon'><i className="tiny material-icons confirm-icon" onClick={() => this.editSale(sale)} style={{cursor: 'pointer'}} title='Edit Sale'>edit</i></td>
              <td className='col s1'><i className="tiny material-icons confirm-icon delete-icon" onClick={() => this.deleteSale(sale)} style={{cursor: 'pointer'}} title='Delete Sale'>delete</i></td>
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
                <th className='col s2'>Date</th>
                <th className='col s2'>Customer</th>
                <th className='col s2'>Kw</th>
                <th className='col s1'>SD</th>
                <th className='col s1'>CL</th>
                <th className='col s1'>SS</th>
                <th className='col s1'>CA</th>
                <th className='col s1'>Edit</th>
                <th className='col s1'>Delete</th>
            </tr>
          </thead>
          <hr />
          <tbody id="products">
            {this.displaySales()}
            <tr className='row'>
              <td className='col s2'><b>TOTAL:</b></td>
              <td className='col s2'></td>
              <td className='col s2'>{kilowatts}</td>
              <td className='col s1'>{sitdown}</td>
              <td className='col s1'>{close}</td>
              <td className='col s1'>{sitesurvey}</td>
              <td className='col s1'>{cancel}</td>
              <td className='col s1'></td>
              <td className='col s1'></td>
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
