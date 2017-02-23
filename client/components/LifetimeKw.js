import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { lifetimekw } from '../actions/lifetimekw'

class LifetimeKw extends React.Component {
  constructor(props) {
    super(props)

    this.state = {initial: true}

    this.goalCheck = this.goalCheck.bind(this)
  }

  componentDidMount() {
    this.setState({initial: true})

  }

  componentDidUpdate() {
      if(this.state.initial) {
        let id = this.props.currentuser.id
        $.ajax({
          url: `/api/user/${id}/sales`,
          type: 'GET',
          dataType: 'JSON'
        }).done( sales => {
          this.props.dispatch(lifetimekw(sales))
          this.setState({initial: false})
        }).fail( data => {
          debugger
        })
      }

  }

  goalCheck() {
    let lifetime = this.props.lifetimekw.SSKW
    if(lifetime >= 1000) {
      return(
        <div>CONGRATS {lifetime}</div>
      )
    } else {

      return(
        <div style={{height: '40px'}}>
          <div style={{height: '75px', borderRadius: '50%', border: '2px solid black', width: '75px', marginLeft: '80px', marginTop: '7px', backgroundColor: '#ddd'}} className='center'><span style={{fontSize: '30px'}}>{Math.round(`${lifetime}`)}</span><br/><span>/1000</span></div>

        </div>
      )
    }
  }

  render() {
    let company = this.props.assingedcompany
    return(
      <div className='row'>
        <div className='col s12' style={{paddingTop: '10px'}}>
          <span style={{fontSize: '20px', fontWeight: 'bold'}}> Lifetime KW Sold:</span><br/>
          {this.goalCheck()}
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  let { user, assignedcompany, currentuser, lifetimekw } = state
  return { user, assignedcompany, currentuser, lifetimekw }
}

export default connect(mapStateToProps)(LifetimeKw)
