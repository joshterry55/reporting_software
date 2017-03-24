import React from 'react'
import { connect } from 'react-redux'
import Admin from './Admin'
import { setFlash } from '../actions/flash';
import DropZone from 'react-dropzone';
import request from 'superagent';
require('superagent-rails-csrf')(request)


class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false}
    this.state = { avatar: [this.props.user.avatar]}

    this.updateCompany = this.updateCompany.bind(this)
  }

  componentDidMount() {
    $('select').material_select();
  }

  componentDidUpdate() {
    $('select').material_select();
    this.refs.truePercentage.value = this.props.assignedcompany.true_percentage
    this.refs.cancelPercentage.value = this.props.assignedcompany.cancel_percentage
    this.refs.color.value = this.props.assignedcompany.color.substring(1)
    this.refs.accentColor.value = this.props.assignedcompany.accent_color.substring(1)
    this.refs.secondaryNavColor.value = this.props.assignedcompany.secondary_nav_color.substring(1)
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
    let secondaryColor = this.refs.secondaryNavColor.value
    let companyText = this.refs.companyText.value
    let accentTextColor = this.refs.accentText.value
    let regexAccentTest = /[0-9A-F]{6}$/i.test(accent)
    let regexSecondaryTest = /[0-9A-F]{6}$/i.test(secondaryColor)
    let regexColorTest = /[0-9A-F]{6}$/i.test(color)
    if(regexColorTest) {
      if(color.length === 6) {
        color = `#${color}`
        if(regexAccentTest) {
          if(accent.length === 6) {
            accent = `#${accent}`
            if(regexSecondaryTest) {
              if(secondaryColor.length === 6) {
                secondaryColor = `#${secondaryColor}`
                $.ajax({
                  url: `/api/companies/${id}`,
                  type: 'PUT',
                  dataType: 'JSON',
                  data: { company: {
                    true_percentage: truePerc,
                    cancel_percentage: cancelPerc,
                    color: color,
                    lifetime_kw: kw,
                    accent_color: accent,
                    accent_text: accentTextColor,
                    color_text: companyText,
                    secondary_nav_color: secondaryColor
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
            alert('Invalid hex code for button color, please use 6-digit format (000000)')
          }
        } else {
          alert('Invalid hex code for button color, please use 6-digit format (000000)')
        }
      } else {
        alert('Invalid hex code for company color, please use 6-digit format (000000)')
      }
    } else {
      alert('Invalid hex code for company color, please use 6-digit format (000000)')
    }

  }

  onDrop = (files) => {
    let id = this.props.assignedcompany.id
    let employee = this.props.user
    let file = files[0];
    let req = request.put(`api/company/${id}/avatar`);
    req.setCsrfToken();
    req.attach('avatar', file)
    req.end( (err, res) => {
      if(res.body) {
        this.setState({avatar: [res.body.avatar]})
      }
    })
  }

  display() {
    let company = this.props.assignedcompany
    let companyColor = company.color.substring(1)
    let companyAccent = company.accent_color.substring(1)
    let companySecondary = company.secondary_nav_color.substring(1)
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
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Company Color (navbar, headings)</b> <br />
            <input ref='color' style={{backgroundColor: `${company.color}`, color: `${this.props.assignedcompany.color_text}`}} className="browser-default employee-info" defaultValue={companyColor} required />
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Button Color (buttons, links)</b> <br />
            <input ref='accentColor' style={{backgroundColor: `${company.accent_color}`, color: `${this.props.assignedcompany.accent_text}`}} className="browser-default employee-info" defaultValue={companyAccent} required />
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px'}}><b>Secondary Nav Color</b> <br />
            <input ref='secondaryNavColor' style={{backgroundColor: `${company.secondary_nav_color}`, color: `${this.props.assignedcompany.accent_text}`}} className="browser-default employee-info" defaultValue={companySecondary} required />
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px', paddingRight: '0px', marginRight: '0px'}}><b> Company Text Color</b> <br />
            <select className="browser-default" ref='companyText' defaultValue={this.props.assignedcompany.color_text} style={{border: '1px solid #ddd'}}>
              <option value="" disabled>Choose your option</option>
              <option value="#ffffff">White</option>
              <option value="#000000">Black</option>
            </select>
          </div>
          <div className='col s12 m6 l4' style={{marginBottom: '30px', height: '40px', paddingRight: '0px', marginRight: '0px'}}><b> Secondary Text Color</b> <br />
            <select className="browser-default" ref='accentText' defaultValue={this.props.assignedcompany.accent_text} style={{border: '1px solid #ddd'}}>
              <option value="" disabled >Choose your option</option>
              <option value="#ffffff">White</option>
              <option value="#000000">Black</option>
            </select>
          </div>
          <div className='col s12' style={{marginBottom: '10px', marginTop: '20px'}}>
            <span style={{fontSize: '20px', fontWeight: 'bold'}}>Company Logo</span> (200w x 100h recommended, transparent background)<DropZone style={{fontSize: '16px', fontWeight: 'regular', lineHeight: '20px', cursor: 'pointer'}} multiple={false} onDrop={this.onDrop} ><span className='edit-icon' style={{color: '#bbb'}}>Edit</span></DropZone>
          </div>
          <div className='col s12'>
            <img style={{maxHeight: '80px', marginTop: '5px', border: '1px solid #ccc', backgroundColor: '#ddd'}} src={this.props.assignedcompany.avatar} alt=""  />
          </div>
          <div className='col s12' style={{marginBottom: '20px'}}> </div>
          <div className='col s12'>
            <input type='submit' className='btn' style={{backgroundColor: `${this.props.assignedcompany.accent_color}`, color: `${this.props.assignedcompany.accent_text}`}} value='Update'/> &nbsp;
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

  // <div style={{height: '200px', marginBottom: '10px'}}>
  //   <div style={{
  //     backgroundImage: `url(${this.props.assignedcompany.avatar})`,
  //     width: '100%',
  //     height: '100%',
  //     maxWidth: '200px',
  //     display: 'block',
  //     backgroundSize: 'cover',
  //     borderRadius: '10px',
  //     boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
  //     margin: '8px 0px 0px 0px',
  //     backgroundColor: 'rgba(0,0,0,0.25)',
  //     zIndex: '1',
  //   }}>
  //   <DropZone className='edit-icon' style={{
  //       backgroundColor: '#aaa',
  //       backgroundImage: `url('http://res.cloudinary.com/dk2bj79p0/image/upload/v1487276928/k8l3cfeaxmgdjja4yyah.jpg')`,
  //       backgroundSize: 'contain',
  //       backgroundRepeat: 'no-repeat',
  //       backgroundPosition: 'center center',
  //       width: '100%',
  //       height: '100%',
  //       maxWidth: '200px',
  //       display: 'block',
  //       borderRadius: '10px',
  //       margin: '0px auto',
  //       position: 'relative',
  //       opacity: '0.25',
  //       zIndex: '2',
  //       cursor: 'pointer'
  //     }} multiple={false} onDrop={this.onDrop} />
  //   </div>
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
