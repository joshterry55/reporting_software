import React from 'react';
import { connect } from 'react-redux'
import Employee from './Employee'
import { lifetimekw } from '../actions/lifetimekw'
import { threemonth } from '../actions/threemonth'
import { sixmonth } from '../actions/sixmonth'

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
      $.ajax({
        url: `/api/company/${id}/videos`,
        type: 'GET',
        dataType: 'JSON'
      }).done( videos => {
        this.props.dispatch({type: 'SHUFFLE_TRAINING_VIDEOS', videos })
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
    let id = user.id
    $.ajax({
      url: `/api/user/${id}/sales`,
      type: 'GET',
      dataType: 'JSON'
    }).done( sales => {
      this.props.dispatch(lifetimekw(sales))
    }).fail( data => {
      debugger
    })
    $.ajax({
      url: `/api/user/${id}/three_month`,
      type: 'GET',
      dataType: 'JSON'
    }).done( sales => {
      this.props.dispatch(threemonth(sales))
    }).fail( data => {

    })
    $.ajax({
      url: `/api/user/${id}/six_month`,
      type: 'GET',
      dataType: 'JSON'
    }).done( sales => {
      this.props.dispatch(sixmonth(sales))
    }).fail( data => {

    })
    this.props.dispatch({type: 'CURRENT_USER', user})
  }

  render() {
    let company = this.props.assingedcompany
    return(
      <div className='row'>
        <div style={{height: '75px', backgroundColor: 'gray', width: '100%'}}>
          <form className='col s12 m4 offset-m4' onSubmit={this.setCurrent}>
            <div className='col s10' style={{marginTop: '15px'}}>
              <select ref='user' className='browser-default' style={{backgroundColor: '#f2f7f'}}>
                <option defaultValue="" disabled selected>Select a salesman</option>
                {this.employeeSelector()}
              </select>
            </div>
            <div className='col s2' style={{marginTop: '20px'}}>
              <input type='submit' className='btn' value='search' style={{backgroundColor: '#60b9e8',    textShadow: '1px 1px 1px rgba(0,0,0,0.5)'}}/>
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
