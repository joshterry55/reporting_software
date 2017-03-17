import React from 'react'
import { connect } from 'react-redux'
import Admin from './Admin'


class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false}
  }

  componentDidMount() {
    // if(this.props.params.code) {
    //   debugger
    // }
  }

  display() {
    let company = this.props.assignedcompany
    return(
      <div>
        <form className='col s12 test-test' style={{backgroundColor: '#f27f7', minHeight: '500px', fontSize: '13px'}} onSubmit={this.updateEmployee}>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Closing percentage above:</b>
            <input type='text' ref='truePercentage' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={company.true_percentage} required/>
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Cancel percentage less than:</b>
            <input type='text' ref='cancelPercentage' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={company.cancel_percentage} required/>
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px', paddingRight: '0px'}}><b>Company Color (for navbar)</b> <br />
            <select ref='role' className="browser-default employee-info">
              <option value='#354458'><span style={{backgroundColor: '#354458'}}>Navy Blue</span></option>
              <option value='#0C98CF'><span style={{backgroundColor: '#0C98CF'}}>Royal Blue</span></option>
            </select>
          </div>
          <div className='col s12'> </div>
          <div className='col s12'>
            <input type='submit' className='btn' style={{backgroundColor: '#60b9e8'}} value='Update'/> &nbsp;
            <span className='btn' style={{backgroundColor: '#F53D3D'}}>Delete</span>
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
