import React from 'react'
import { connect } from 'react-redux'
import Admin from './Admin'
import { setFlash } from '../actions/flash';


class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false}

    this.updateCompany = this.updateCompany.bind(this)
  }

  componentDidUpdate() {
    this.refs.truePercentage.value = this.props.assignedcompany.true_percentage
    this.refs.cancelPercentage.value = this.props.assignedcompany.cancel_percentage
    this.refs.color.value = this.props.assignedcompany.color.substring(1)
    this.refs.accentColor.value = this.props.assignedcompany.accent_color.substring(1)
    this.refs.lifetimeKw.value = this.props.assignedcompany.lifetime_kw
  }

  updateCompany(e) {
    e.preventDefault()
    let truePerc = this.refs.truePercentage.value
    let cancelPerc = this.refs.cancelPercentage.value
    let id = this.props.assignedcompany.id
    let kw = this.refs.lifetimeKw.value
    let color = this.refs.color.value
    let accent = this.refs.accentColor.value
    let regexAccentTest = /[0-9A-F]{6}$/i.test(accent)
    let regexColorTest = /[0-9A-F]{6}$/i.test(color)
    if(regexColorTest) {
      if(color.length === 6) {
        color = `#${color}`
        if(regexAccentTest) {
          if(accent.length === 6) {
            accent = `#${accent}`
            $.ajax({
              url: `/api/companies/${id}`,
              type: 'PUT',
              dataType: 'JSON',
              data: { company: {
                true_percentage: truePerc,
                cancel_percentage: cancelPerc,
                color: color,
                lifetime_kw: kw,
                accent_color: accent
              }}
            }).done( company => {
              let messageSuccess = `${company.name} Updated`
              this.props.dispatch(setFlash(messageSuccess, 'success'))
              this.props.dispatch({type: 'ASSIGNED_COMPANY', company})
            }).fail( data => {

            })
          } else {
            alert('Invalid hex code for secondary color, please use 6-digit format (000000)')
          }
        } else {
          alert('Invalid hex code for secondary color, please use 6-digit format (000000)')
        }
      } else {
        alert('Invalid hex code for company color, please use 6-digit format (000000)')
      }
    } else {
      alert('Invalid hex code for company color, please use 6-digit format (000000)')
    }

  }

  display() {
    let company = this.props.assignedcompany
    let companyColor = company.color.substring(1)
    let companyAccent = company.accent_color.substring(1)
    return(
      <div>
        <form className='col s12 test-test' style={{backgroundColor: '#f27f7', minHeight: '500px', fontSize: '13px'}} onSubmit={this.updateCompany}>
          <div className='col s12' style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>
            Goals
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Closing percentage above:</b>
            <input type='text' ref='truePercentage' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={company.true_percentage} required/>
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Cancel percentage less than:</b>
            <input type='text' ref='cancelPercentage' style={{backgroundColor: 'white'}} className='employee-info' defaultValue={company.cancel_percentage} required/>
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Lifetime Kw goal:</b>
            <input type='text' ref='lifetimeKw' style={{backgroundColor: 'white'}} className='employee-info' placeholder='100, 1000 etc.' defaultValue={company.lifetime_kw} required/>
          </div>
          <div className='col s12' style={{ marginBottom: '10px', marginTop: '20px'}}>
            <span style={{fontSize: '20px', fontWeight: 'bold'}}>Customize Colors</span> (defaults: Company: #354458, Secondary: #60B9E8)
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Company Color (hex code for navbar)</b> <br />
            <input ref='color' style={{backgroundColor: `${company.color}`, color: 'white', textShadow: '1px 1px 1px rgba(0,0,0,1.5)'}} className="browser-default employee-info" defaultValue={companyColor} required />
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Secondary Color (hex code for buttons, links)</b> <br />
            <input ref='accentColor' style={{backgroundColor: `${company.accent_color}`, color: 'white', textShadow: '1px 1px 1px rgba(0,0,0,1.5)'}} className="browser-default employee-info" defaultValue={companyAccent} required />
          </div>
          <div className='col s12' style={{marginBottom: '20px'}}> </div>
          <div className='col s12'>
            <input type='submit' className='btn' style={{backgroundColor: `${this.props.assignedcompany.accent_color}`}} value='Update'/> &nbsp;
          </div>
        </form>
      </div>
    )
  }

  // <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px', paddingRight: '0px'}}><b>Company Color (for navbar)</b> <br />
  //   <select ref='color' className="browser-default employee-info" defaultValue={company.color}>
  //     <option value='#000'>Black</option>
  //     <option value='#007034'>Dark Green</option>
  //     <option value='#008080'>Dark Turquoise</option>
  //     <option value='#354458'>Navy Blue</option>
  //     <option value='#F07818'>Orange</option>
  //     <option value='#ffc0cb'>Pink</option>
  //     <option value='#5C2D50'>Purple (eggplant)</option>
  //     <option value='#DC403B'>Red</option>
  //     <option value='#D96459'>Red-Orange</option>
  //     <option value='#0C98CF'>Royal Blue</option>
  //     <option value='#00C8F8'>Sky Blue</option>
  //     <option value='#3EB6D1'>Turquoise</option>
  //   </select>
  // </div>


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
