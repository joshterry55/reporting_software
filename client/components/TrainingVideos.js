import React from 'react'
import { Link, browserHistory } from 'react-router';

class TrainingVideos extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addVideo: false }
    this.state = { editVideo: false }
  }

  componentDidMount() {
    let sectionId = parseInt(this.props.params.id)
    $.ajax({
      type: 'GET',
      url: `/api/training_sections/${sectionId}/training_videos`,
      dataType: 'JSON'
    }).done( videos => {
      debugger
    }).fail( data => {
      debugger
    })
  }

  render() {
    return(
      <div className='row container white-container'>
        test
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

export default TrainingVideos
