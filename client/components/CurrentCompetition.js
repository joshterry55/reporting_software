import React from 'react'
import { connect } from 'react-redux'

class CurrentCompetition extends React.Component {
  constructor(props) {
    super(props)

    this.prizes = this.prizes.bind(this)
    this.groups = this.groups.bind(this)
  }

  componentDidMount() {
  }

  prizes() {
    if(this.props.currentprizes.length) {
      return this.props.currentprizes.map( prize => {
        return(
          <div className='col s6 m4'>
            {prize.name}
          </div>
        )
      })
    }
  }

  getTotals() {
    return(
      <div>
        5
      </div>
    )
  }

  groups() {
    if(this.props.currentgroups.length) {
      return this.props.currentgroups.map( group => {
        return(
          <div  key={group.id} className='col s12 m6 l4' style={{marginBottom: '20px'}}>
            <div className='col s8' style={{height: '150px', marginBottom: '10px'}}>
              <div style={{
                  backgroundImage: `url(${group.avatar})`,
                  width: '100%',
                  height: '100%',
                  maxWidth: '150px',
                  display: 'block',
                  backgroundSize: 'cover',
                  borderRadius: '5px',
                  boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                  margin: '10px auto'
                }}>
              </div>
            </div>
            <div className='col s4 center' style={{marginTop: '10px'}}>
              <span style={{borderBottom: '1px solid #ccc'}}>{group.name}</span>
              <div className='center' style={{fontSize: '30px'}}>
                {this.getTotals()}
              </div>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    return(
      <div className='row'>
        <div className='col s12 center'>
          {this.props.currentcompetition.name}
        </div>
        <div className='col s12'>
          {this.prizes()}
        </div>
        <div className='col s12'>
          {this.groups()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, currentcompetition, currentprizes, currentgroups } = state
  return { user, assignedcompany, currentcompetition, currentprizes, currentgroups }
}

export default connect(mapStateToProps)(CurrentCompetition)
