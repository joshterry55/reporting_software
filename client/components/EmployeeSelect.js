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

        </div>
      )
    }
  }

  employeeSelector() {
    if(this.props.employees.length) {
      return this.props.employees.map( employee => {
        return(<option key={employee.id} value={employee.id} id={`rep${employee.id}`}>{`${employee.first_name} ${employee.last_name}`}</option>);
      });
    }
  }

  setCurrent(e) {
    e.preventDefault()

    let user
    this.props.employees.map( employee => {
      if($(`#rep${employee.id}`).is(':selected') === true) {
        user = employee
      }
    })
    if(user) {
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
  }

  render() {
    let company = this.props.assignedcompany
    return(
      <div className='row'>
        <div style={{height: '75px', backgroundColor: 'gray'}}>
          <div className='col s12 m4 offset-m4'>
            <form onSubmit={this.setCurrent} className='col s12'>
              <div className='col s12' style={{marginTop: '15px'}}>
                <select ref='user' className='browser-default' style={{backgroundColor: '#f2f7f'}} onChange={this.setCurrent}>
                  <option defaultValue="" disabled selected>Select a salesman</option>
                  {this.employeeSelector()}
                </select>
              </div>

            </form>
          </div>
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
