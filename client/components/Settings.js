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
        <div className='col s12 m6 l4' style={{marginBottom: '10px', height: '60px', border: '1px solid #ddd'}}><b>True Closing Percentage:</b> <br />
          <span style={{fontSize: '18px'}}>{company.true_percentage}</span>
        </div>
        <div className='col s12 m6 l4' style={{marginBottom: '10px', height: '60px', border: '1px solid #ddd'}}><b>Cancel Percentage:</b> <br />
          <span style={{fontSize: '18px'}}>{company.cancel_percentage}</span>
        </div>
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
