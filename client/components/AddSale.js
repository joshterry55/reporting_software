import React from 'react'
import {connect} from 'react-redux'
import { companyemployees, employees } from '../actions/employees';
import { setFlash } from '../actions/flash';

class AddSale extends React.Component {
  constructor(props) {
    super(props)

    this.submitSale = this.submitSale.bind(this)
    this.employeeFind = this.employeeFind.bind(this)
  }
  //
  // componentDidMount() {
  //   if(this.props.currentoffice.id) {
  //   } else {
  //     let companyId = this.props.assignedcompany.id
  //     this.props.dispatch(companyemployees(companyId))
  //   }
  // }

  componentDidUpdate() {
  $('select').material_select();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
}

employeeFind(id) {
  let employeeName
  this.props.employees.map( employee => {
    if(employee.id === parseInt(id)) {
     employeeName = `${employee.first_name} ${employee.last_name}`
    }
  });
  return(
      employeeName
  )
}

  submitSale(e) {
    e.preventDefault()
    let employeeId = this.refs.employee.value
    let salesman = this.employeeFind(employeeId)
    let officeId = this.props.currentoffice.id
    let regionId = this.props.currentregion.id
    let companyId = this.props.assignedcompany.id
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
      var test = new Date(input)
      let date = this.dateFormat(test)
      $.ajax({
        url: '/api/sales',
        type: 'POST',
        dataType: 'JSON',
        data: { sale: {
          first_name: firstName,
          last_name: lastName,
          kw: kw,
          user_id: employeeId,
          region_id: regionId,
          office_id: officeId,
          company_id: companyId,
          sit_down: sitDown,
          close: close,
          site_survey: siteSurvey,
          cancel: cancel,
          date: date,
          salesman: salesman
        }}
      }).done( sale => {
        let messageSuccess = `Sale Added`
        this.props.dispatch(setFlash(messageSuccess, 'success'))
        this.refs.saleForm.reset()
      }).fail( data => {
        debugger
      })
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
            <p style={styles.customLabel}>Customer First Name</p>
            <input type='text' ref='firstName' required placeholder="First Name" />
            <p style={styles.customLabel}>Customer Last Name</p>
            <input type='text' ref='lastName' required placeholder="Last Name" />
            <p style={styles.customLabel}>KW</p>
            <input type='text' ref='kw' required placeholder="ex. 5.2"/>
            <p>
              <input type="checkbox" id="sitdown" className='filled-in checkbox-blue' />
              <label htmlFor="sitdown">Sit Down</label>
            </p>
            <p>
              <input type="checkbox" id="close" className='filled-in checkbox-blue' />
              <label htmlFor="close">Closed Sale</label>
            </p>
            <p>
              <input type="checkbox" id="sitesurvey" className='filled-in checkbox-blue' />
              <label htmlFor="sitesurvey">Site Survey</label>
            </p>
            <p>
              <input type="checkbox" id="cancel" className='filled-in checkbox-blue' />
              <label htmlFor="cancel">Cancelled</label>
            </p>
            <label>Date</label>
            <input type="date" ref='date' className="datepicker" placeholder='click to select date' />
          </div>
          <div className='col s6 offset-s3 l4 offset-l4' style={{marginBottom: '30px', marginTop: '10px'}}>
            <button type='submit' className='btn' style={{backgroundColor: '#60b9e8', width: '100%', textAlign: 'center'}}>Add Sale</button>
          </div>
        </form>
      )
    } else {
      return(
        <div className="center">
          <h4>No Employees</h4>
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
const styles = {
  customLabel: {
    padding: '0px',
    margin: '0px',
    fontSize: '12px',
    color: 'gray'
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, employees, assignedregions, assignedoffices, currentoffice, currentregion } = state
  return { user, assignedcompany, employees, assignedregions, assignedoffices, currentoffice, currentregion }
}

export default connect(mapStateToProps)(AddSale)
