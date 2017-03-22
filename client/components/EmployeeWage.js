import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { saleswage } from '../actions/saleswage'


class EmployeeWage extends Component {
	constructor(props) {
		super(props);

		this.dateSelect = this.dateSelect.bind(this)
		this.selection = this.selection.bind(this)
		this.wage = this.wage.bind(this)
	}

	componentDidMount() {
		$('select').material_select();
	}

	componentDidUpdate() {
		$('select').material_select();
		if(this.props.saleswage.kw) {
		} else {
			this.refs.wageSelector.value = ''
		}
	}

	selection() {
		let userId = this.props.currentuser.id
		if($('#week').is(':selected') === true) {
			$.ajax({
				url: `/api/user/${userId}/wage_sales`,
				type: 'GET',
				dataType: 'JSON',
				data: {
					startday: 'week'
				}
			}).done( sales => {
				this.props.dispatch(saleswage(sales))
			}).fail( data => {

			})
		} else if($('#month').is(':selected') === true) {

			$.ajax({
				url: `/api/user/${userId}/wage_sales`,
				type: 'GET',
				dataType: 'JSON',
				data: {
					startday: 'month'
				}
			}).done( sales => {
				this.props.dispatch(saleswage(sales))
			}).fail( data => {

			})
		} else if($('#year').is(':selected') === true) {

			$.ajax({
				url: `/api/user/${userId}/wage_sales`,
				type: 'GET',
				dataType: 'JSON',
				data: {
					startday: 'year'
				}
			}).done( sales => {
				this.props.dispatch(saleswage(sales))
			}).fail( data => {

			})
		}
	}

	dateSelect() {
		return(
			<div className='col s12 m8 offset-m2'>
				<form>
					<select className='browser-default' ref='wageSelector' onChange={this.selection} defaultValue=''>
						<option value='' selected>select filter</option>
						<option id='week'>Week</option>
						<option id='month'>Month</option>
						<option id='year'>Year</option>
					</select>
				</form>
			</div>
		)
	}

	wage() {
		if(this.props.user.role === 'Employee') {
			if(this.props.saleswage.kw) {
				let currentWage = this.props.user.wage
				let totalKw = this.props.saleswage.kw
				let salesWage = (parseInt(totalKw) * parseInt(currentWage))
				return(
					<div>
						<span className='left' style={{textAlign: 'left'}}>$</span>
						<span style={{paddingLeft: '5px'}}>{salesWage}</span>
					</div>
				)
			} else {
				return(
					<div>
						<span className='left' style={{textAlign: 'left'}}>$</span>
						<span style={{paddingLeft: '5px'}}>0</span>
					</div>
				)
			}
		} else {
			if(this.props.saleswage.kw) {
				let currentWage = this.props.currentuser.wage
				let totalKw = this.props.saleswage.kw
				let salesWage = (parseInt(totalKw) * parseInt(currentWage))
				return(
					<div>
						<span className='left' style={{textAlign: 'left'}}>$</span>
						<span style={{paddingLeft: '5px'}}>{salesWage}</span>
					</div>
				)
			} else {
				return(
					<div>
						<span className='left' style={{textAlign: 'left'}}>$</span>
						<span style={{paddingLeft: '5px'}}>0</span>
					</div>
				)
			}
		}
	}

	render() {
		return(
			<div>
				<div className='col s12' style={{backgroundColor: `${this.props.assignedcompany.color}`, paddingTop: '10px', paddingBottom: '10px', borderTopRightRadius: '5px', borderTopLeftRadius: '5px'}}>
					{this.dateSelect()}
				</div>
				<div className='col s12' style={{border: '1px solid #bbb', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', backgroundColor: '#f2f7f7', paddingTop: '5px', paddingBottom: '10px'}}>
					<div className='center' style={{fontSize: '20px', margin: '0px', padding: '0px'}}>Estimated Income</div>
					<div className='center' style={{fontSize: '12px', margin: '0px', paddingBottom: '7px'}}>(Based on closed deals)</div>
					<div style={{width: '90px', border: '1px solid #aaa', margin: '0 auto', paddingLeft: '5px', borderRadius: '2px', paddingTop: '2px', paddingBottom: '2px'}}>
						{this.wage()}
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	topBarContainer: {
		height: '45px',
	}
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, currentuser, saleswage } = state;
  return { user, assignedcompany, currentuser, saleswage }
}

export default connect(mapStateToProps)(EmployeeWage);
