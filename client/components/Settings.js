import React from 'react'
import { connect } from 'react-redux'
import Admin from './Admin'


class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false}

    this.updateCompany = this.updateCompany.bind(this)
  }

  componentDidMount() {
    // if(this.props.params.code) {
    //   debugger
    // }
  }

  updateCompany(e) {
    e.preventDefault()
    let truePerc = this.refs.truePercentage.value
    let cancelPerc = this.refs.cancelPercentage.value
    let id = this.props.assignedcompany.id
    let color = this.refs.color.value
    $.ajax({
      url: `/api/companies/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { company: {
        true_percentage: truePerc,
        cancel_percentage: cancelPerc,
        color: color
      }}
    }).done( company => {
      this.props.dispatch({type: 'ASSIGNED_COMPANY', company})
    }).fail( data => {

    })
  }

  display() {
    let company = this.props.assignedcompany
    return(
      <div>
        <form className='col s12 test-test' style={{backgroundColor: '#f27f7', minHeight: '500px', fontSize: '13px'}} onSubmit={this.updateCompany}>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Closing percentage above:</b>
            <input type='text' ref='truePercentage' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={company.true_percentage} required/>
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Cancel percentage less than:</b>
            <input type='text' ref='cancelPercentage' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={company.cancel_percentage} required/>
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px', paddingRight: '0px'}}><b>Company Color (for navbar)</b> <br />
            <select ref='color' className="browser-default employee-info" defaultValue={company.color}>
              <option value='#354458'>Navy Blue</option>
              <option value='#0C98CF'>Royal Blue</option>
            </select>
          </div>
          <div className='col s12'> </div>
          <div className='col s12'>
            <input type='submit' className='btn' style={{backgroundColor: '#60b9e8'}} value='Update'/> &nbsp;
          </div>
        </form>
      </div>
    )
  }


  render() {
    return(
      <div className='row'>
        <Admin />
        <div className='col s12 center' style={{backgroundColor: '#ccc'}}>
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
            <span style={{fontSize: '20px'}}>Settings</span>
          </div>
        </div>
        <div className='col s12 m10 offset-m1 l8 offset-l2' style={{marginTop: '15px'}}>
          {this.display()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(Settings)
