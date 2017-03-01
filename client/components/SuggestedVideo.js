import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'


class SuggestedVideo extends React.Component {
  constructor(props) {
    super(props)

    this.showVideo = this.showVideo.bind(this)
  }

  componentDidMount() {
    let companyId = this.props.assignedcompany.id
    $.ajax({
      url: `/api/company/${companyId}/videos`,
      type: 'GET',
      dataType: 'JSON'
    }).done( sortedVideos => {

      this.props.dispatch({type: 'TRAINING_VIDEOS', sortedVideos })
    }).fail( data => {

    })
  }

  showVideo() {
    if(this.props.trainingvideos.length) {
      let videoId = parseInt(this.props.params.id)
      return this.props.trainingvideos.map( video => {
        if(videoId === video.id) {
          return(
            <div className='col s12 m10 offset-m1 center' style={{marginTop: '30px', marginBottom: '40px'}}>
              <span style={{fontSize: '30px'}}>{video.name}</span><br />
              <span style={{fontSize: '20px'}}>- {video.video_purpose}</span>
              <iframe className='col s12' style={{marginTop: '20px', borderRadius: '5px'}}
                src={video.link} height="600" frameBorder="0" allowFullScreen>
              </iframe>
            </div>
          )
        }
      })
    }
  }

  render() {
    return(
      <div className='row'>
        <div className='col s12 m10 offset-m1 white-container'>
          {this.showVideo()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany, trainingvideos } = state
  return { user, assignedcompany, trainingvideos }
}

export default connect(mapStateToProps)(SuggestedVideo)
