import React from 'react'
import { connect } from 'react-redux'

class Regions extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addRegion: false }

    this.createRegion = this.createRegion.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
  }

  componentDidMount() {
    let companyId = this.props.user.assigned_company[0].id
    $.ajax({
      url: '/api/regions',
      type: 'GET',
      dataType: 'JSON',
      data: { company_id: companyId }
    }).done( regions => {
      this.props.dispatch({ type: 'ASSIGNED_REGIONS', regions })
    }).fail( data => {
      console.log(data);
    });
  }

  createRegion(e) {
    e.preventDefault()
    let name = this.refs.regionName.value
    let companyId = this.props.user.assigned_company[0].id
    $.ajax({
      url: '/api/regions',
      type: 'POST',
      dataType: 'JSON',
      data: { region: {
        name: name,
        company_id: companyId
      }}
    }).done( region => {
      this.props.dispatch({type: 'ADD_ASSIGNED_REGION', region})
      this.refs.regionForm.reset()
    }).fail( data => {
    })
  }

  toggleAdd() {
    this.setState({addRegion: !this.state.addRegion})
  }

  display() {
    if(this.state.addRegion) {
      return(
        <div>
          <form ref='regionForm' onSubmit={this.createRegion}>
            <input ref='regionName' placeholder='Region Name'/>
            <input type='submit' />
          </form>
          <button onClick={this.toggleAdd}>Cancel</button>
        </div>
      )
    } else {
      return(
        <button onClick={this.toggleAdd}>Add Region</button>
      )
    }
  }

  render() {
    return(
      <div>
        {this.display()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user } = state
  return { user }
}

export default connect(mapStateToProps)(Regions)
