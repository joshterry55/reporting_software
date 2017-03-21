import React from 'react'
import { connect } from 'react-redux'
import LifetimeKw from './LifetimeKw'
import DropZone from 'react-dropzone';
import request from 'superagent';
require('superagent-rails-csrf')(request)
import { threemonth } from '../actions/threemonth'
import { sixmonth } from '../actions/sixmonth'
import ThreeGraph from './ThreeGraph'
import { Link } from 'react-router';


class Employee extends React.Component {
  constructor(props) {
    super(props)

    this.state = {edit: false}

    this.currentUserCheck = this.currentUserCheck.bind(this)
    this.editCheck = this.editCheck.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.suggestedCancelVideo = this.suggestedCancelVideo.bind(this)
    this.suggestedTrueVideo = this.suggestedTrueVideo.bind(this)
    this.suggestedMotivationVideo = this.suggestedMotivationVideo.bind(this)
    this.office = this.office.bind(this)
    this.motivation = this.motivation.bind(this)
    this.cancelVideos = this.cancelVideos.bind(this)
    this.trueVideos = this.trueVideos.bind(this)
  }

  componentDidMount() {
    if(this.props.user.role === 'Employee') {
      let user = this.props.user
      this.props.dispatch({type: 'CURRENT_USER', user })
      let id = user.id
      $.ajax({
        url: `/api/user/${id}/three_month`,
        type: 'GET',
        dataType: 'JSON'
      }).done( sales => {
        this.props.dispatch(threemonth(sales))
      }).fail( data => {

      })
      $.ajax({
        url: `/api/user/${id}/six_month`,
        type: 'GET',
        dataType: 'JSON'
      }).done( sales => {
        this.props.dispatch(sixmonth(sales))
      }).fail( data => {

      })
      let companyId = this.props.assignedcompany.id
      $.ajax({
        url: `/api/company/${companyId}/videos`,
        type: 'GET',
        dataType: 'JSON'
      }).done( videos => {

        this.props.dispatch({type: 'SHUFFLE_TRAINING_VIDEOS', videos })
      }).fail( data => {

      })
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
        <span style={{backgroundColor: '#ffcdd2', padding: '0px 2px'}}> 0%</span>
      )
    } else if(siteSurvey === 0) {
      return(
        <span style={{backgroundColor: '#ffcdd2', padding: '0px 2px'}}> 0%</span>
      )
    } else {
      let percentage = ((siteSurvey / sitDown) * 100).toFixed(1)
      if(percentage <= parseInt(this.props.assignedcompany.true_percentage)) {
        return(
          <span style={{backgroundColor: '#ffcdd2', padding: '0px 2px'}}>{percentage}%</span>
        )
      } else {
        return(
          <span>{percentage}%</span>
        )
      }
    }
  }

  cancelPerc(threemonth) {
    let cancel = threemonth.cancel
    let close = threemonth.close
    if(close === 0) {
      return(
        <span> 0%</span>
      )
    } else if(cancel === 0) {
      return(
        <span> 0%</span>
      )
    } else {
      let percentage = ((cancel / close) * 100).toFixed(1)
      if(percentage >= parseInt(this.props.assignedcompany.cancel_percentage)) {
        return(
          <span style={{backgroundColor: '#ffcdd2', padding: '0px 2px'}}>{percentage}%</span>
        )
      } else {
        return(
          <span>{percentage}%</span>
        )
      }
    }
  }

  thumbnail(url) {
    let id = url.replace('https://www.youtube.com/embed/', '')
    let link = id.replace('?rel=0','')
    return(
      link
    )
  }

  cancelVideos(threemonth) {
    if(threemonth.id) {
      let cancel = threemonth.cancel
      let close = threemonth.close
      let cancelPercentage
      if(cancel === 0) {
        cancelPercentage = 0
      } else if(close === 0) {
        cancelPercentage = 0
      } else {
        cancelPercentage = ((cancel / close) * 100)
      }
      if(cancelPercentage >= parseInt(this.props.assignedcompany.cancel_percentage)) {
        return(
          <div>
            <div className='center' style={{marginTop: '5px', marginBottom: '5px'}}>
              <span style={{fontSize: '15px', backgroundColor: `${this.props.assignedcompany.accent_color}`, padding: '5px 10px', color: `${this.props.assignedcompany.accent_text}`, borderRadius: '5px', border: '1px solid #aaa'}}>High Cancellation Rate </span>
            </div>
            <div style={{marginTop: '10px'}}>
              {this.suggestedCancelVideo()}
            </div>
          </div>
        )
      }
    }
  }

  suggestedCancelVideo() {
    if(this.props.trainingvideos.length) {
      return this.props.trainingvideos.map( video => {
        if(video.video_purpose === 'reduce cancellation percentage') {
          let code = this.thumbnail(video.link)
          return(
            <div  key={video.id} className='col s12' style={{margin: '0px', padding: '0px'}}>
              <div className='col s12 left'>
                  <Link className="sidebar-link col s12 left" style={{color: 'black', fontSize: '15px', borderBottom: '1px solid #bbb', paddingBottom: '10px', paddingTop: '10px', display: 'block', paddingLeft: '0px'}} to={`/suggestedvideo/${video.id}`}>
                    <div className='col s12' style={{height: '100px', paddingLeft: '10px', paddingBottom: '10px', display: 'block'}}>
                      <div style={{
                          backgroundImage: `url('http://img.youtube.com/vi/${code}/0.jpg')`,
                          width: '100%',
                          height: '100%',
                          maxWidth: '125px',
                          display: 'block',
                          backgroundSize: 'cover',
                          borderRadius: '10px',
                          boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                          margin: '8px 0',
                          zIndex: '1',
                        }}>
                      </div>
                    </div>
                    <div className='col s12 link' style={{paddingLeft: '11px', paddingTop: '5px'}}>
                      <span>{video.name}</span>
                    </div>
                  </Link>
              </div>
            </div>
          )
        }
      })
    }
  }

  trueVideos(threemonth) {
    if(threemonth.id) {
      let sitdown = threemonth.sit_down
      let siteSurvey = threemonth.site_survey
      let truePercentage
      if(sitdown === 0) {
        truePercentage = 0
      } else if(siteSurvey === 0) {
        truePercentage = 0
      } else {
        truePercentage = ((siteSurvey / sitdown) * 100)
      }
      if(truePercentage <= parseInt(this.props.assignedcompany.true_percentage)) {
        return(
          <div >
            <div className='center' style={{marginTop: '5px', marginBottom: '5px'}}>
              <span style={{fontSize: '15px', backgroundColor: `${this.props.assignedcompany.accent_color}`, padding: '5px 10px', color: `${this.props.assignedcompany.accent_text}` , borderRadius: '5px', border: '1px solid #aaa'}}>Low Close Rate</span>
            </div>
            <div style={{marginTop: '10px'}}>
              {this.suggestedTrueVideo()}
            </div>
          </div>
        )
      }
    }
  }

  suggestedTrueVideo() {
    if(this.props.trainingvideos.length) {
      return this.props.trainingvideos.map( video => {
        if(video.video_purpose === 'improve true percentage') {
          let code = this.thumbnail(video.link)
          return(
            <div  key={video.id} className='col s12' style={{margin: '0px', padding: '0px'}}>
              <div className='col s12 left'>
                  <Link className="sidebar-link col s12 left" style={{color: 'black', fontSize: '15px', borderBottom: '1px solid #bbb', paddingBottom: '10px', paddingTop: '10px', display: 'block', paddingLeft: '0px'}} to={`/suggestedvideo/${video.id}`}>
                    <div className='col s12' style={{height: '100px', paddingLeft: '10px', paddingBottom: '10px', display: 'block'}}>
                      <div style={{
                          backgroundImage: `url('http://img.youtube.com/vi/${code}/0.jpg')`,
                          width: '100%',
                          height: '100%',
                          maxWidth: '125px',
                          display: 'block',
                          backgroundSize: 'cover',
                          borderRadius: '10px',
                          boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                          margin: '8px 0',
                          zIndex: '1',
                        }}>
                      </div>
                    </div>
                    <div className='col s12 link' style={{paddingLeft: '11px', paddingTop: '5px'}}>
                      <span>{video.name}</span>
                    </div>
                  </Link>
              </div>
            </div>
          )
        }
      })
    }
  }

  motivation(threemonth) {
    if(threemonth.id) {
      let cancel = threemonth.cancel
      let close = threemonth.close
      let trueSiteSurvey = threemonth.site_survey
      let sitdown = threemonth.sit_down
      let cancelPercentage
      let truePercentage
      if(cancel === 0) {
        cancelPercentage = 0
      } else if(close === 0) {
        cancelPercentage = 0
      } else {
        cancelPercentage = ((cancel / close) * 100)
      }
      if(sitdown === 0) {
        truePercentage = 0
      } else if(trueSiteSurvey === 0) {
        truePercentage = 0
      } else {
        truePercentage = ((trueSiteSurvey / sitdown) * 100)
      }
      if((cancelPercentage < parseInt(this.props.assignedcompany.cancel_percentage)) && (truePercentage > parseInt(this.props.assignedcompany.true_percentage))) {
        return(
          <div>
            <div className='center' style={{marginTop: '5px', marginBottom: '5px'}}>
              <span style={{fontSize: '15px', backgroundColor: `${this.props.assignedcompany.accent_color}`, padding: '5px 10px', color: `${this.props.assignedcompany.accent_text}` , borderRadius: '5px', border: '1px solid #aaa'}}>Motivation</span>
            </div>
            {this.suggestedMotivationVideo()}
          </div>
        )
      }
    }
  }

  suggestedMotivationVideo() {
    if(this.props.trainingvideos.length) {
      return this.props.trainingvideos.map( video => {
        if(video.video_purpose === 'motivation') {
          let code = this.thumbnail(video.link)
          return(
            <div key={video.id} className='col s12' style={{margin: '0px', padding: '0px'}}>
              <div className='col s12 left'>
                  <Link className="sidebar-link col s12 left" style={{color: 'black', fontSize: '15px', borderBottom: '1px solid #bbb', paddingBottom: '10px', paddingTop: '10px', display: 'block', paddingLeft: '0px'}} to={`/suggestedvideo/${video.id}`}>
                    <div className='col s12' style={{height: '100px', paddingLeft: '10px', paddingBottom: '10px', display: 'block'}}>
                      <div style={{
                          backgroundImage: `url('http://img.youtube.com/vi/${code}/0.jpg')`,
                          width: '100%',
                          height: '100%',
                          maxWidth: '125px',
                          display: 'block',
                          backgroundSize: 'cover',
                          borderRadius: '10px',
                          boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                          margin: '8px 0',
                          zIndex: '1',
                        }}>
                      </div>
                    </div>
                    <div className='col s12 link' style={{paddingLeft: '11px', paddingTop: '5px'}}>
                      <span>{video.name}</span>
                    </div>
                  </Link>
              </div>
            </div>
          )
        }
      })
    }
  }

  graphSetup(sixmonth) {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date
    let d = date.getMonth()
    let month = monthNames[d]
    if(sixmonth[month] >= 0) {
      return(
        <ThreeGraph sixMonth={sixmonth} />
      )
    }
  }

  office() {
    if(this.props.user.role === 'Employee') {
      let officeName = this.props.assignedoffices[0].name
      return(
        <span>{officeName}</span>
      )
    } else if(this.props.user.role === 'Admin') {
      let officeId = this.props.currentuser.office_id
      let officeName
      this.props.assignedoffices.map(office => {
        if(officeId === office.id) {
          officeName = office.name
        }
      })
      return(
        <span>{officeName}</span>
      )
    }
  }

  render() {
    let user = this.props.currentuser
    let company = this.props.assignedcompany
    let threemonth = this.props.threemonth
    let sixmonth = this.props.sixmonth
    return(
      <div className='row'>
        <div style={{ width: '100%', backgroundColor: '#f2f7f7', marginBottom: '0px', borderBottom: '2px solid #ccc'}} className='row'>
          <div style={{ height: '125px', borderRight: '2px solid #ccc', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <div className='col s6 l4' style={{paddingTop: '10px'}}>
              {this.editCheck(user)}
            </div>
            <div className='col s6 l4' style={{paddingTop: '10px'}}>
              <span style={{fontSize: '20px', fontWeight: 'bold'}}>{`${user.first_name} ${user.last_name}`}</span><br />
              <span style={{fontSize: '15px'}}>{company.name}</span><br />
              {this.office()}
            </div>

          </div>
          <div style={{ height: '125px', borderRight: '2px solid #ccc', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4'>
            <div className='col s12 center' style={{paddingTop: '10px'}}>
              <span style={{fontSize: '20px', fontWeight: 'bold'}}>Current Month</span><br/>
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
                  <div>{this.truePerc(threemonth)}</div>
                </div>
                <div style={{height: '40px', paddingLeft: '0px', overflow: 'hidden', whiteSpace: 'nowrap'}} className='col s2 center'>
                  <div style={{textDecoration: 'underline'}}>Cancel %</div>
                  <div>{this.cancelPerc(threemonth)}</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: '125px', marginTop: '10px', marginBottom: '10px'}} className='col s12 m4 center'>
            <LifetimeKw />
          </div>
        </div>
        <div className='col s12 l8' style={{backgroundColor: '#ddd', padding: '10px 0px'}}>
          <div className='col s12' style={{height: '600px', borderRight: '2px solid #ccc'}}>
            {this.graphSetup(sixmonth)}

          </div>
        </div>
        <div className='col s12 l4' style={{backgroundColor: '#ddd', padding: '10px 0px'}}>
          <div className='col s12' >
            <div className='center' style={{backgroundColor: `${this.props.assignedcompany.color}`, height: '40px', fontSize: '20px', lineHeight: '40px', marginBottom: '10px', color: `${this.props.assignedcompany.color_text}`}}>
              Suggested Videos
            </div>
            <div style={{height: '550px', overflow: 'scroll'}}>
              <div>
                {this.motivation(threemonth)}
              </div>
              <div>
                {this.trueVideos(threemonth)}
              </div>
              <div>
                {this.cancelVideos(threemonth)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, lifetimekw, assignedcompany, currentuser, threemonth, trainingvideos, sixmonth, assignedoffices } = state
  return { user, lifetimekw, assignedcompany, currentuser, threemonth, trainingvideos, sixmonth, assignedoffices }
}

export default connect(mapStateToProps)(Employee)
