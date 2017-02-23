import React from 'react';
import { connect } from 'react-redux'
import Employee from './Employee'

class EmployeeSelect extends React.Component {
  constructor(props) {
    super(props)

    this.check = this.check.bind(this)
    this.employeeSelector = this.employeeSelector.bind(this)
    this.setCurrent = this.setCurrent.bind(this)
  }

  componentDidMount() {
    if(this.props.assignedcompany.id) {
      let id = this.props.assignedcompany.id
      $.ajax({
        url: `/api/company/${id}/users`,
        type: 'GET',
        dataType: 'JSON'
      }).done( users => {
        this.props.dispatch({type: 'EMPLOYEES', users })
      }).fail( data => {

      })
    }
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  check() {
    if(this.props.currentuser.id) {
      return(
        <div>
          <Employee />
        </div>
      )
    } else {
      return(
        <div>

          no current
        </div>
      )
    }
  }

  employeeSelector() {
    if(this.props.employees.length) {
      return this.props.employees.map( employee => {
        return(<option key={employee.id} value={employee.id}>{`${employee.first_name} ${employee.last_name}`}</option>);
      });
    }
  }

  setCurrent(e) {
    e.preventDefault()
    let userId = this.refs.user.value
    let user
    this.props.employees.map(employee => {

      if(employee.id === parseInt(userId)) {
        user = employee
      }
    })
    this.props.dispatch({type: 'CURRENT_USER', user})
  }

  render() {
    let company = this.props.assingedcompany
    return(
      <div className='row'>
        <div style={{height: '75px', backgroundColor: 'gray', width: '100%'}}>
          <form className='col s12 m4 offset-m4' onSubmit={this.setCurrent}>
            <div className='col s10' style={{marginTop: '10px'}}>
              <select ref='user'>
                {this.employeeSelector()}
              </select>
            </div>
            <div className='col s2' style={{marginTop: '30px'}}>
              <input type='submit' />
            </div>
          </form>
          <div className='col s12'></div>
        </div>
        {this.check()}
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  let { user, assignedcompany, currentuser, employees } = state
  return { user, assignedcompany, currentuser, employees }
}

export default connect(mapStateToProps)(EmployeeSelect)
