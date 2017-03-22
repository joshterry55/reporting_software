import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { employeecustomers } from '../actions/employeecustomers'

class EmployeeCustomers extends Component {
	constructor(props) {
		super(props);

		this.selection = this.selection.bind(this)
		this.displaySales = this.displaySales.bind(this)
		this.customerTable = this.customerTable.bind(this)
	}

	componentDidUpdate() {
		// if(this.props.employeecustomers.length) {
		// } else {
		// 	this.refs.customerSelector.value = ''
		// }
	}

	selection() {
		let userId = this.props.currentuser.id
		if($('#weekCustomer').is(':selected') === true) {
			$.ajax({
				url: `/api/user/${userId}/all_employee_customers`,
				type: 'GET',
				dataType: 'JSON',
				data: {
					startday: 'week'
				}
			}).done( customers => {
				this.props.dispatch(employeecustomers(customers))
			}).fail( data => {

			})
		} else if($('#monthCustomer').is(':selected') === true) {
			$.ajax({
				url: `/api/user/${userId}/all_employee_customers`,
				type: 'GET',
				dataType: 'JSON',
				data: {
					startday: 'month'
				}
			}).done( customers => {
				this.props.dispatch(employeecustomers(customers))
			}).fail( data => {

			})
		} else if($('#yearCustomer').is(':selected') === true) {
			$.ajax({
				url: `/api/user/${userId}/all_employee_customers`,
				type: 'GET',
				dataType: 'JSON',
				data: {
					startday: 'year'
				}
			}).done( customers => {
				this.props.dispatch(employeecustomers(customers))
			}).fail( data => {

			})
		}
	}

	sitDownCheck(sitdown) {
		if(sitdown === 1) {
			return(
				<i className="tiny material-icons" style={{color: 'white', backgroundColor: 'green', padding: '2px', borderRadius: '2px'}}><b>done</b></i>
			)
		}
	}
	closeCheck(close) {
		if(close === 1) {
			return(
				<i className="tiny material-icons" style={{color: 'white', backgroundColor: 'green', padding: '2px', borderRadius: '2px'}}><b>done</b></i>
			)
		}
	}
	siteSurveyCheck(siteSurvey) {
		if(siteSurvey === 1) {
			return(
				<i className="tiny material-icons" style={{color: 'white', backgroundColor: 'green', padding: '2px', borderRadius: '2px'}}><b>done</b></i>
			)
		}
	}
	cancelCheck(cancel) {
		if(cancel === 1) {
			return(
				<i className="tiny material-icons" style={{color: 'white', backgroundColor: 'red', padding: '2px', borderRadius: '2px'}}><b>done</b></i>
			)
		}
	}

	// class="btn tooltipped" data-position="bottom" data-delay="50" data-tooltip="I am tooltip"


	displaySales() {
		if(this.props.employeecustomers.length) {
			return this.props.employeecustomers.map( sale => {
				return(
						<tr className='row' style={{height: '40px', lineHeight: '40px'}} key={sale.id}>
							<td className='col s2'>{sale.date}</td>
							<td className='col s2'>{sale.salesman}</td>
							<td className='col s2'>{sale.first_name} {sale.last_name}</td>
							<td className='col s1'>{sale.kw}</td>
							<td className='col s1'>{this.sitDownCheck(sale.sit_down)}</td>
							<td className='col s1'>{this.closeCheck(sale.close)}</td>
							<td className='col s1'>{this.siteSurveyCheck(sale.site_survey)}</td>
							<td className='col s1'>{this.cancelCheck(sale.cancel)}</td>
						</tr>
				);
			});
		} else {
			return(
					<tr className='row' style={{height: '100px', lineHeight: '100px'}}>
						<td className='col s12 center' style={{backgroundColor: '#f2f7f7', color: '#ccc'}}>No Customers</td>
					</tr>
			);
		}
	}

	customerTable() {
		if(this.props.employeecustomers.length) {

		} else {
			return(
				<div className='col s12 center' style={{paddingTop: '50px', color: '#ccc', fontSize: '18px'}}>
					<div className='col s12 center'>No Customers</div>
				</div>
			)
		}
	}

	render() {
		return(
			<div className='col s12'>
				<div className='col s12 center' style={{backgroundColor: `${this.props.assignedcompany.color}`, fontSize: '20px', borderTopRightRadius: '5px', borderTopLeftRadius: '5px', padding: '10px 10px'}}>
					<form className='col s12 m6 offset-m3'>
						<select className='browser-default'  ref='customerSelector' onChange={this.selection} defaultValue=''>
							<option value='' selected>Select to view customers</option>
							<option id='weekCustomer'>Week</option>
							<option id='monthCustomer'>Month</option>
							<option id='yearCustomer'>Year</option>
						</select>
					</form>
				</div>
				<div className='col s12' style={{backgroundColor: '#f2f7f7', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}}>
					<table className='striped scroll' >
						<thead style={{borderBottom: '1px solid black', height: '30px', lineHeight: '30px'}}>
							<tr className='row' style={{marginBottom: '0px'}}>
									<th className='col s2'>Date</th>
									<th className='col s2'>Salesman</th>
									<th className='col s2'>Customer</th>
									<th className='col s1'>KW</th>
									<th className='col s1'>SD</th>
									<th className='col s1'>CL</th>
									<th className='col s1'>SS</th>
									<th className='col s1'>CA</th>
							</tr>
						</thead>
						<tbody id="products">
							{this.displaySales()}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
  let { user, assignedcompany, currentuser, employeecustomers } = state;
  return { user, assignedcompany, currentuser, employeecustomers }
}

export default connect(mapStateToProps)(EmployeeCustomers);
