import React from 'react'
import { connect } from 'react-redux'
import LifetimeKw from './LifetimeKw'
import DropZone from 'react-dropzone';
import request from 'superagent';
require('superagent-rails-csrf')(request)

class Employee extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false}

    this.currentUserCheck = this.currentUserCheck.bind(this)
    this.editCheck = this.editCheck.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  componentDidMount() {
    if(this.props.user.role === 'Employee') {
      let user = this.props.user
      this.props.dispatch({type: 'CURRENT_USER', user })
    }
  }

  currentUserCheck() {
    if(this.props.user.id === this.props.currentuser.id) {
      if(this.state.edit) {
        return(
          <div><i style={{cursor: 'pointer', color: '#bbb'}} className="picture-edit" onClick={this.toggleEdit}>Cancel</i></div>
        )
      } else {
        return(
          <div><i style={{cursor: 'pointer', color: '#bbb'}} className="picture-edit" onClick={this.toggleEdit}>Edit</i></div>
        )
      }
    }
  }

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  }

  onDrop = (files) => {
    let current = this.props.currentuser
    let file = files[0];
    let req = request.put(`api/users/${current.id}/avatar`);
    req.setCsrfToken();
    req.attach('avatar', file)
    req.end( (err, res) => {
      if(res.body) {
        let newAvatar = res.body.avatar
        current.avatar = newAvatar
        this.props.dispatch({type: 'UPDATE_USER_AVATAR', current})
        this.toggleEdit()
      }
    }, this)
  }

  editCheck(user) {
    if(this.state.edit) {
      return(
        <div style={{marginBottom: '10px'}} className='center'>
          <div style={{height: '100px', marginBottom: '2px', paddingLeft: '10px', position: 'relative'}}>
            <div style={{
                backgroundImage: `url(${user.avatar})`,
                width: '100%',
                height: '100%',
                maxWidth: '100px',
                display: 'inline-block',
                backgroundSize: 'cover',
                borderRadius: '10px',
                boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                backgroundColor: 'rgba(0,0,0,0.25)',
                zIndex: '1',

              }}>
              <DropZone style={{
                  backgroundColor: '#aaa',
                  backgroundImage: `url('http://res.cloudinary.com/dk2bj79p0/image/upload/v1487276928/k8l3cfeaxmgdjja4yyah.jpg')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  width: '100%',
                  height: '100%',
                  maxWidth: '100px',
                  display: 'inline-block',
                  borderRadius: '10px',
                  margin: '0px auto',
                  position: 'relative',
                  opacity: '0.65',
                  zIndex: '2',
                }} multiple={false} onDrop={this.onDrop} />
              </div>
            </div>
            {this.currentUserCheck()}
        </div>
      )
    } else {
      return(
        <div style={{marginBottom: '10px'}} className='center'>
          <div style={{height: '100px', marginBottom: '2px', paddingLeft: '10px'}}>
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
          {this.currentUserCheck()}
        </div>
      )
    }
  }

  truePerc(threemonth) {

    let siteSurvey = threemonth.site_survey
    let sitDown = threemonth.sit_down
    if(sitDown === 0) {
      return(
        0
      )
    } else if(siteSurvey === 0) {
      return(
        0
      )
    } else {
      return(
      ((siteSurvey / sitDown) * 100).toFixed(1)
      )
    }
  }

  cancelPerc(threemonth) {
    let cancel = threemonth.cancel
    let siteSurvey = threemonth.site_survey
    if(siteSurvey === 0) {
      return(
        0
      )
    } else if(cancel === 0) {
      return(
        0
      )
    } else {
      return(
      ((cancel / siteSurvey) * 100).toFixed(1)
      )
    }
  }


  render() {
    let user = this.props.currentuser
    let company = this.props.assignedcompany
    let threemonth = this.props.threemonth
    return(
      <div className='row'>
        <div style={{ width: '100%', backgroundColor: '#f2f7f7', marginBottom: '0px', borderBottom: '2px solid #ccc'}} className='row'>
          <div style={{ height: '125px', borderRight: '2px solid #ccc', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <div className='col s6 l4' style={{paddingTop: '10px'}}>
              {this.editCheck(user)}
            </div>
            <div className='col s6 l4' style={{paddingTop: '10px'}}>
              <span style={{fontSize: '20px', fontWeight: 'bold'}}>{`${user.first_name} ${user.last_name}`}</span><br />
              <span style={{fontSize: '15px'}}>{company.name}</span>
            </div>

          </div>
          <div style={{ height: '125px', borderRight: '2px solid #ccc', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <div className='col s12 center' style={{paddingTop: '10px'}}>
              <span style={{fontSize: '20px', fontWeight: 'bold'}}>Three Month Stats</span><br/>
              <div style={{paddingTop: '5px'}}>
                <div style={{height: '40px', paddingLeft: '0px', overflow: 'hidden', whiteSpace: 'nowrap'}} className='col s2 center'>
                  <div style={{textDecoration: 'underline'}}>Closed</div>
                  <div>{threemonth.close}</div>
                </div>
                <div style={{height: '40px', paddingLeft: '0px',overflow: 'hidden', whiteSpace: 'nowrap'}} className='col s2 center'>
                  <div style={{textDecoration: 'underline'}}>Surveyed</div>
                  <div>{threemonth.site_survey}</div>
                </div>
                <div style={{height: '40px', paddingLeft: '0px'}} className='col s2 center'>
                  <div style={{textDecoration: 'underline'}}>SS kw</div>
                  <div>{threemonth.site_survey_kw} kw</div>
                </div>
                <div style={{height: '40px', paddingLeft: '0px', overflow: 'hidden', whiteSpace: 'nowrap'}} className='col s2 center'>
                  <div style={{textDecoration: 'underline'}}>Cancelled</div>
                  <div>{threemonth.cancel}</div>
                </div>
                <div style={{height: '40px', paddingLeft: '0px', overflow: 'hidden', whiteSpace: 'nowrap'}} className='col s2 center'>
                  <div style={{textDecoration: 'underline'}}>True %</div>
                  <div>{this.truePerc(threemonth)}%</div>
                </div>
                <div style={{height: '40px', paddingLeft: '0px', overflow: 'hidden', whiteSpace: 'nowrap'}} className='col s2 center'>
                  <div style={{textDecoration: 'underline'}}>Cancel %</div>
                  <div>{this.cancelPerc(threemonth)}%</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: '125px', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <LifetimeKw />
          </div>
        </div>
        <div className='col s12 l8' style={{backgroundColor: '#ddd', padding: '10px 0px'}}>
          <div className='col s12' style={{height: '600px', borderRight: '2px solid #ccc'}}> blah</div>
        </div>
        <div className='col s12 l4' style={{backgroundColor: '#ddd', padding: '10px 0px'}}>
          <div className='col s12' style={{height: '600px'}}></div>
        </div>
        TESSST
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, lifetimekw, assignedcompany, currentuser, threemonth } = state
  return { user, lifetimekw, assignedcompany, currentuser, threemonth }
}

export default connect(mapStateToProps)(Employee)
