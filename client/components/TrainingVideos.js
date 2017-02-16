import React from 'react'
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { trainingvideos } from '../actions/trainingvideos'

class TrainingVideos extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addVideo: false }
    this.state = { editVideo: false }

    this.toggleAdd = this.toggleAdd.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.createVideo = this.createVideo.bind(this)
    this.display = this.display.bind(this)
    this.adminCheck = this.adminCheck.bind(this)
    this.setVideo = this.setVideo.bind(this)
    this.editVideo = this.editVideo.bind(this)
    this.deleteVideo = this.deleteVideo.bind(this)
    this.displaySideBar = this.displaySideBar.bind(this)
  }

  componentDidMount() {
    let sectionId = parseInt(this.props.params.id)
    $.ajax({
      type: 'GET',
      url: `/api/training_sections/${sectionId}/training_videos`,
      dataType: 'JSON'
    }).done( videos => {
      this.props.dispatch(trainingvideos(videos))
    }).fail( data => {
      debugger
    })
  }

  toggleAdd() {
    this.setState({addVideo: !this.state.addVideo})
  }

  toggleEdit() {
    this.setState({editVideo: !this.state.editVideo})
  }

  formatLink(url) {
    let id = url.substring(url.indexOf("=") + 1);
    let link = `https://www.youtube.com/embed/${id}?rel=0`
    return(
      link
    )
  }

  createVideo(e) {
    e.preventDefault()
    let name = this.refs.videoName.value
    let sectionId = parseInt(this.props.params.id)
    let url = this.refs.videoLink.value
    let link = this.formatLink(url)

    $.ajax({
      url: '/api/training_videos',
      type: 'POST',
      dataType: 'JSON',
      data: { training_video: {
        name: name,
        link: link,
        training_section_id: sectionId,
      }}
    }).done( video => {
      this.props.dispatch({type: 'ADD_TRAINING_VIDEO', video})
      this.refs.videoForm.reset()
      this.toggleAdd()
    }).fail( data => {
    })
  }

  display() {
    if(this.props.user.role === 'Admin') {
      if(this.state.addVideo) {
        return(
          <div className='col s12' style={{marginTop: '20px'}}>
            <div className='col s12 m6 offset-m3 center'>
              Go to YouTube and find your video. Copy the ENTIRE link and paste it in the 'Link' field.
            </div>
            <div className='col s12'><br /></div>
            <div className='col s12 m6 offset-m3'>
              <form ref='videoForm' onSubmit={(e) => this.createVideo(e)}>
                <div className='col s12 '>
                  <label>Video Name</label>
                  <input ref='videoName' placeholder='New Video' autoFocus required />
                </div>
                <div className='col s12 '>
                  <label>Link</label>
                  <input ref='videoLink' placeholder='Video Link' required />
                </div>
                <div className='col s12 center' style={{marginBottom: '15px'}}>
                  <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Add' />
                </div>
              </form>
              <div className='center col s12' style={{marginBottom: '10px'}}>
                <span onClick={this.toggleAdd} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <div className="center">
            <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: '#60b9e8'}}>+ Add Video</span>
          </div>
        )
      }
    }
  }

  deleteVideo(id) {
    let confirmed = confirm('Are you sure you want to delete this video?')
    if(confirmed) {
      $.ajax({
        type: 'DELETE',
        url: `/api/training_videos/${id}`,
        dataType: 'JSON'
      }).done( video => {
        this.props.dispatch({type: 'REMOVE_TRAINING_VIDEO', video})
      }).fail( data => {

      })
    }
  }

  editVideo(e, video) {
    e.preventDefault()
    let name = this.refs.editVideoName.value
    let url = this.refs.editVideoLink.value
    let link
    if(video.link === url) {
      link = url
    } else {
      link = this.formatLink(url)
    }
    let id = video.id
    $.ajax({
      url: `/api/training_videos/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { training_video: {
        name: name,
        link: link
      }}
    }).done( video => {
      this.props.dispatch({type: 'UPDATE_TRAINING_VIDEO', video})
      this.refs.editVideoForm.reset()
      this.toggleEdit()
    }).fail( data => {
    })
  }

  setVideo(video) {
    this.props.dispatch({type: 'CURRENT_VIDEO', video})
    this.toggleEdit()
  }

  adminCheck(video) {
    if(this.props.user.role === 'Admin') {
      return(
        <span>
          <i className="tiny material-icons edit-icon" onClick={() => this.setVideo(video)} style={{cursor: 'pointer'}} title='Edit Video'>edit</i><i style={{cursor: 'pointer'}} className="tiny material-icons delete-icon" title="Delete Video" onClick={() => this.deleteVideo(video.id)}>delete</i>
        </span>
      )
    }
  }

  displayVideos() {
    if(this.props.trainingvideos.length) {
      return this.props.trainingvideos.map( video => {
        if(this.state.editVideo) {
          if(this.props.currentvideo.id === video.id) {
            return(
              <div  key={video.id} className='col s12' style={{marginBottom: '50px'}}>
                <div className='col s12 m10 offset-m1'>
                  <form ref='editVideoForm' onSubmit={(e) => this.editVideo(e, video)}>
                    <div className='col s12 '>
                      <label>Video Name</label>
                      <input ref='editVideoName' style={{fontSize: '15px'}} placeholder={video.name} defaultValue={video.name} autoFocus required />
                    </div>
                    <div className='col s12 '>
                      <label>Link</label>
                      <input ref='editVideoLink' style={{fontSize: '15px'}} placeholder={video.link} defaultValue={video.link} required />
                    </div>
                    <div className='col s12 center' style={{marginBottom: '15px'}}>
                      <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Update' />
                    </div>
                  </form>
                  <div className='center col s12' style={{marginBottom: '10px'}}>
                    <span onClick={this.toggleEdit} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
                  </div>
                </div>
              </div>
            )
          } else {
            return(
              <div key={video.id} className='col s12' style={{marginBottom: '50px'}}>
                <iframe className='col s12'
                  src={video.link} height="400" frameBorder="0" allowFullScreen>
                </iframe>
                <div className='col s12'>
                  <div style={{fontSize: '28px', border: '1px solid #bbb', borderTop: 'none', backgroundColor: '#ddd', paddingLeft: '10px'}}>
                    <span>{video.name} {this.adminCheck(video)}</span>
                  </div>
                </div>
              </div>
            )
          }
        } else {
          return(
            <div  key={video.id} name={video.id} id={video.id} className='col s12' style={{marginBottom: '50px', paddingRight: '22px'}}>
              <iframe className='col s12'
                src={video.link} height="400" frameBorder="0" allowFullScreen>
              </iframe>
              <div className='col s12'>
                <div style={{fontSize: '28px', border: '1px solid #bbb', borderTop: 'none', backgroundColor: '#ddd', paddingLeft: '10px'}}>
                  <span>{video.name} {this.adminCheck(video)}</span>
                </div>
              </div>
            </div>
          );
        }
      });
    }
  }

  displaySideBar() {
    if(this.props.trainingvideos.length) {
      return this.props.trainingvideos.map( video => {
        return(
          <div  key={video.id} className='col s12' style={{marginBottom: '0px'}}>

            <div className='col s12 center'>
                <a className="sidebar-link" style={{color: 'black', fontSize: '20px', borderBottom: '1px solid #bbb', paddingBottom: '10px', paddingTop: '10px', display: 'block'}} href={`#${video.id}`}>{video.name}</a>
            </div>
          </div>
        )
      })
    }
  }

  // <div className="sidebar-link" style={{fontSize: '20px', borderBottom: '1px solid #bbb', paddingBottom: '10px', paddingTop: '10px'}}>
  //   <a className="link" style={{color: 'black'}} href={`#${video.id}`}>{video.name}</a>
  // </div>

  // <iframe className='col s12 m10 offset-m1' style={{position: 'relative', zIndex: "1"}}
  //   src={video.link} height="50" frameBorder="0" allowFullScreen>
  // </iframe>

  render() {
    return(
      <div className='row'>
        <div className='col s12 m10 offset-m1 white-container'>
          <div className='center' id='toTop' name='toTop' style={{fontSize: '50px', paddingTop: '20px'}}>
            Training Videos
          </div>
          {this.display()}
          <div className='col s12 m9'>
            <div className='col s12'><br/><br /></div>
            {this.displayVideos()}
            <div className='col s12 center'>
              <a href='#toTop' className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Back to top</a>
              <br />
            </div>
          </div>
          <div className='col s12 m3' style={{height: '700px', backgroundColor: '#ddd', marginTop: '42px', borderRadius: '5px', paddingTop: '20px', overflow: 'scroll'}}>
            {this.displaySideBar()}
          </div>
          <div className='col s12' style={{marginBottom: '20px'}}></div>
        </div>
      </div>
    )
  }

  // render() {
  //   let test = '0yW7w8F2TVA'
  //   let link = `https://www.youtube.com/embed/${test}`
  //   return(
  //     <div  className='row container white-container'>
  //       <div className='col s12 m6'>
  //         <div className='col s12 m6 offset-m3'>
  //           <iframe
  //             src={link} height="300" allowFullScreen>
  //           </iframe>
  //         </div>
  //       </div>
  //       <div className='col s12 m6 center'>
  //         <div className='col s12 center'>
  //           <Link to='/announcements'>Announcements</Link>
  //         </div>
  //         <iframe style={{display: 'inline-block'}}
  //           src={link} height="200" allowFullScreen>
  //         </iframe>
  //       </div>
  //     </div>
  //   )
  // }
}

const mapStateToProps = (state) => {
  let { user, trainingvideos, currentvideo } = state
  return { user, trainingvideos, currentvideo }
}

export default connect(mapStateToProps)(TrainingVideos)
