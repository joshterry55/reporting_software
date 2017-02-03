import React from 'react'
import {connect} from 'react-redux'
import { companyemployees, employees } from '../actions/employees';
import { setFlash } from '../actions/flash';

class AddSale extends React.Component {
  constructor(props) {
    super(props)

    this.submitSale = this.submitSale.bind(this)
  }

  componentDidMount() {
    if(this.props.currentoffice.id) {
    } else {
      let companyId = this.props.assignedcompany.id
      this.props.dispatch(companyemployees(companyId))
    }
  }

  componentDidUpdate() {
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
}

  submitSale(e) {
    e.preventDefault()
    let employeeId = this.refs.employee.value
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
    let date = this.refs.date.value
    $.ajax({
      url: '/api/sales',
      type: 'POST',
      dataType: 'JSON',
      data: { sale: {
        first_name: firstName,
        last_name: lastName,
        kw: kw,
        user_id: employeeId,
        sit_down: sitDown,
        close: close,
        site_survey: siteSurvey,
        cancel: cancel,
        date: date
      }}
    }).done( sale => {
      let messageSuccess = `Sale Added`
      this.props.dispatch(setFlash(messageSuccess, 'success'))
      this.refs.saleForm.reset()
    }).fail( data => {
      debugger
    })
  }

  employeeOptions() {
    return this.props.employees.map( employee => {
      return(<option key={employee.id} value={employee.id}>{`${employee.first_name} ${employee.last_name}`}</option>);
    });
  }

  addSale() {
    if(this.props.employees.length) {
      return(
        <form ref='saleForm' onSubmit={this.submitSale}>
          <div>
            <label>Select a salesman</label>
            <select ref='employee'>
              { this.employeeOptions() }
            </select>
            <br />
            <label>First Name</label>
            <input type='text' ref='firstName' required />
            <label>Last Name</label>
            <input type='text' ref='lastName' required/>
            <label>KW</label>
            <input type='text' ref='kw' required />
            <p>
              <input type="checkbox" id="sitdown" className='filled-in' />
              <label htmlFor="sitdown">Sit Down</label>
            </p>
            <p>
              <input type="checkbox" id="close" className='filled-in' />
              <label htmlFor="close">Closed Sale</label>
            </p>
            <p>
              <input type="checkbox" id="sitesurvey" className='filled-in' />
              <label htmlFor="sitesurvey">Site Survey</label>
            </p>
            <p>
              <input type="checkbox" id="cancel" className='filled-in' />
              <label htmlFor="cancel">Cancelled</label>
            </p>
            <label>Date</label>
            <input type="date" ref='date' className="datepicker" placeholder='click to select date' />
          </div>
          <div>
            <button type='submit' className='btn' style={{backgroundColor: '#60b9e8'}}>Add Sale</button>
          </div>
        </form>
      )
    } else {
      return(
        <div>
          No Employees
        </div>
      )
    }
  }

  render() {
    return(
      <div className="col s12" style={{marginTop: '15px'}}>
        {this.addSale()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, employees, assignedregions, assignedoffices, currentoffice } = state
  return { user, assignedcompany, employees, assignedregions, assignedoffices, currentoffice }
}

export default connect(mapStateToProps)(AddSale)
