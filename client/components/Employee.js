import React from 'react'
import { connect } from 'react-redux'
import LifetimeKw from './LifetimeKw'

class Employee extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    let user = this.props.user
    this.props.dispatch({type: 'CURRENT_USER', user })
  }

  render() {
    let user = this.props.user
    let company = this.props.assignedcompany

    return(
      <div>
        <div style={{ width: '100%', backgroundColor: '#f2f7f7'}} className='row'>
          <div style={{ height: '125px', borderRight: '2px solid #ccc', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <div className='col s6 l4' style={{paddingTop: '10px'}}>
              <div style={{height: '100px', marginBottom: '10px', paddingLeft: '10px'}}>
                <div style={{
                    backgroundImage: `url(${user.avatar})`,
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
              <span style={{fontSize: '20px', fontWeight: 'bold'}}>BLAH BLAH BLAH</span><br/>
                <div style={{height: '40px'}}>
                  <div className='left'><span style={{fontSize: '30px'}}>{Math.round(888.8)}</span><span>/1000 kw</span></div>

                </div>
            </div>
          </div>
          <div style={{ height: '125px', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <LifetimeKw />
          </div>

        </div>
        TESSST
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, lifetimekw, assignedcompany, currentuser } = state
  return { user, lifetimekw, assignedcompany, currentuser }
}

export default connect(mapStateToProps)(Employee)
