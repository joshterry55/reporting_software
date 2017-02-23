import React from 'react'
import { connect } from 'react-redux'
import { lifetimekw } from '../actions/lifetimekw'

class Employee extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let id = this.props.user.id
    $.ajax({
      url: `/api/user/${id}/sales`,
      type: 'GET',
      dataType: 'JSON'
    }).done( sales => {
      this.props.dispatch(lifetimekw(sales))
    }).fail( data => {
      debugger
    })
  }

  render() {
    let user = this.props.user
    let lifetimeKw = this.props.lifetimekw
    let company = this.props.assignedcompany
    return(
      <div>
        <div style={{ width: '100%', backgroundColor: '#f2f7f7'}} className='row'>
          <div style={{ height: '125px', borderRight: '2px solid #ccc', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <div className='col s6 l4' style={{paddingTop: '10px'}}>
              <div style={{height: '100px', marginBottom: '10px', paddingLeft: '10px'}}>
                <div style={{
                    backgroundImage: `url('http://res.cloudinary.com/dk2bj79p0/image/upload/v1483585049/anonBee_wgbcih.jpg')`,
                    width: '100%',
                    height: '100%',
                    maxWidth: '100px',
                    display: 'inline-block',
                    backgroundSize: 'cover',
                    borderRadius: '10px',
                    boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                  }}>
                </div>
              </div>
            </div>
            <div className='col s6 l4' style={{paddingTop: '10px'}}>
              <span style={{fontSize: '20px', fontWeight: 'bold'}}>{`${user.first_name} ${user.last_name}`}</span>
            </div>

          </div>
          <div style={{ height: '125px', borderRight: '2px solid #ccc', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <div className='col s12' style={{paddingTop: '10px'}}>
              <span style={{textDecoration: 'underline'}}>BLAH BLAH BLAH</span><br/>
              <span> test</span>
            </div>
          </div>
          <div style={{ height: '125px', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <div className='col s12' style={{paddingTop: '10px'}}>
              <span style={{textDecoration: 'underline'}}>{company.name} Lifetime KW Sold:</span><br/>
              <span>{lifetimeKw.SSKW}</span>
            </div>
          </div>

        </div>
        TESSST
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, lifetimekw, assignedcompany } = state
  return { user, lifetimekw, assignedcompany }
}

export default connect(mapStateToProps)(Employee)
