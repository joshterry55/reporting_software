import React from 'react'
import {connect} from 'react-redux'
import { setFlash } from '../actions/flash';
import { totalsales } from '../actions/totalsales';

class ReportOfficeSales extends React.Component {
  constructor(props) {
    super(props)

    this.editSale = this.editSale.bind(this)
    this.editModal = this.editModal.bind(this)
    this.deleteSale = this.deleteSale.bind(this)
    this.submitEdittedSale = this.submitEdittedSale.bind(this)
  }

  componentDidMount() {
    $('.modal').modal();
  }

  componentDidUpdate() {
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    this.refs.firstName.value = this.props.currentsale.first_name;
    this.refs.lastName.value = this.props.currentsale.last_name;
    this.refs.kw.value = this.props.currentsale.kw.toString()
    if(this.props.currentsale.sit_down === 1) {
      this.refs.sitdown.checked = true
    } else {
      this.refs.sitdown.checked = false
    }

    if(this.props.currentsale.close === 1) {
      this.refs.close.checked = true
    } else {
      this.refs.close.checked = false
    }

    if(this.props.currentsale.site_survey === 1) {
      this.refs.sitesurvey.checked = true
    } else {
      this.refs.sitesurvey.checked = false
    }

    if(this.props.currentsale.cancel === 1) {
      this.refs.cancel.checked = true
    } else {
      this.refs.cancel.checked = false
    }
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

  submitEdittedSale(e) {
    e.preventDefault()
    let id = this.props.currentsale.id
    let kw = this.refs.kw.value
    let firstName = this.refs.firstName.value
    let lastName = this.refs.lastName.value
    let sitDown = $('#sitdown').is(':checked')
    let close = $('#close').is(':checked')
    let siteSurvey = $('#sitesurvey').is(':checked')
    let cancel = $('#cancel').is(':checked')
    if(sitDown === true) {
      sitDown = 1
    } else {
      sitDown = 0
    }
    if(close === true) {
      close = 1
    } else {
      close = 0
    }
    if(siteSurvey === true) {
      siteSurvey = 1
    } else {
      siteSurvey = 0
    }
    if(cancel === true) {
      cancel = 1
    } else {
      cancel = 0
    }
    let input = this.refs.date.value
    if(input === '') {
      alert("Please Select a Date")
    } else {
      let parseKw = parseFloat(kw)
      if(parseKw == NaN) {
        alert("KW must be a valid number")
      } else {
        var test = new Date(input)
        let date = this.dateFormat(test)

        $.ajax({
          url: `api/sales/${id}`,
          type: 'PUT',
          dataType: 'JSON',
          data: { sale: {
            first_name: firstName,
            last_name: lastName,
            kw: kw,
            sit_down: sitDown,
            close: close,
            site_survey: siteSurvey,
            cancel: cancel,
            date: date
          }}
        }).done( sale => {
          let messageSuccess = `Sale Updated`
          this.props.dispatch({type: 'UPDATE_OFFICE_SALES', sale})
          this.props.dispatch(setFlash(messageSuccess, 'success'))
          this.refs.editSaleForm.reset()
        }).fail( data => {
          debugger
        })
      }
    }
  }

  dateFormat(day) {
    let fullDate = day
    let myDate = []
    myDate.push(fullDate.toDateString().substr(0, 3))
    let monthNumber = fullDate.getMonth();
    let monthNames = ["January", "February", "March", "April",
                      "May", "June", "July", "August", "September",
                      "October", "November", "December"]
    myDate.push(monthNames[monthNumber] + ' ' + fullDate.getDate())
    myDate.push(fullDate.getFullYear())

    return `${myDate[1]}, ${myDate[2]}`
  }

  editModal() {

		return(
			<div>
				<form className='row' ref='editSaleForm' onSubmit={this.submitEdittedSale}>
          <div style={styles.modalHeader}>
            <span>Add Shift</span>
            <span style={styles.modalHeaderInfo}>blah<br />blah</span>
          </div>
					<div className="modal-content">
            <p className='col s12' style={styles.customLabel}>Customer First Name</p>
            <input type='text' ref='firstName' required placeholder="First Name" />
            <p className='col s12' style={styles.customLabel}>Customer Last Name</p>
            <input type='text' ref='lastName' required placeholder="Last Name" />
            <p className='col s12' style={styles.customLabel}>KW</p>
            <input type='text' ref='kw' required placeholder="ex. 5.2"/>
            <p className='col s12'>
              <input type="checkbox" ref='sitdown' id="sitdown" className='filled-in' />
              <label htmlFor="sitdown">Sit Down</label>
            </p>
            <p className='col s12'>
              <input type="checkbox" ref='close' id="close" className='filled-in' />
              <label htmlFor="close">Closed Sale</label>
            </p>
            <p className='col s12'>
              <input type="checkbox" ref='sitesurvey' id="sitesurvey" className='filled-in' />
              <label htmlFor="sitesurvey">Site Survey</label>
            </p>
            <p className='col s12'>
              <input type="checkbox" ref='cancel' id="cancel" className='filled-in' />
              <label htmlFor="cancel">Cancelled</label>
            </p>
						<div className='col s12'>
              <label>Date</label>
              <input type="date" ref='date' className="datepicker" placeholder='click to select date' />
						</div>
					</div>
					<div className="modal-footer">
						<button type="submit" className=" modal-action waves-effect waves-green btn-flat">Update</button>
					</div>
				</form>
			</div>
		)
	}

  editSale(sale) {
    this.props.dispatch({type: 'CURRENT_SALE', sale})
  }

  deleteSale(sale) {
    alert('Do we need a delete option for sales?')
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
              <td className='col s1 edit-icon'><i className="tiny material-icons confirm-icon" data-target="modal1" onClick={() => this.editSale(sale)} style={{cursor: 'pointer'}} title='Edit Sale'>edit</i></td>
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
        <div id="modal1" className="modal modal-height" style={styles.modalStyling}>
          {this.editModal()}
        </div>
      </div>
    )
  }
}

const styles = {
  customLabel: {
    padding: '0px',
    margin: '0px',
    fontSize: '12px',
    color: 'gray'
  },
  modalStyling: {
    width: '80%',
    maxWidth: '500px',
    border: '1px solid #333',
    borderRadius: '10px'
  },
  modalFooter: {
    position: 'absolute',
    bottom: '0px',
  },
  modalHeader: {
    width: '100%',
    height: '60px',
    lineHeight: '61px',
    color: '#fff',
    fontSize: '35px',
    textShadow: '0 0 5px rgba(0,0,0,0.50)',
    backgroundColor: "#66f",
    background: "linear-gradient(#1b7ff2, #1257a6)",
    borderBottom: '1px solid #333',
    boxShadow: '0 0 6px #000',
    position: 'relative',
    paddingLeft: '10px'
  },
  modalHeaderInfo: {
    color: '#fff',
    fontSize: '20px',
    lineHeight: '30px',
    position: 'absolute',
    right: '10px',
    textAlign: 'right',
    textShadow: '0 0 5px rgba(0,0,0,0.50)'
  }
}

const mapStateToProps = (state) => {
  let { officesales, currentoffice, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown, currentsale } = state
  return { officesales, currentoffice, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown, currentsale }
}

export default connect(mapStateToProps)(ReportOfficeSales)
