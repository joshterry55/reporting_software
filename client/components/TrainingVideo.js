import React from 'react'
import { Link, browserHistory } from 'react-router';

class TrainingVideo extends React.Component {
  constructor(props) {
    super(props)
  }

  redirect() {
    debugger
    return(
      <div>
        <Link to='/announcements'>Announcements</Link>
      </div>
    )
  }

  render() {
    let test = '0yW7w8F2TVA'
    let link = `https://www.youtube.com/embed/${test}`
    return(
      <div  className='row container white-container'>
        <div className='col s12 m6'>
          <div className='col s12 m6 offset-m3'>
            <iframe
              src={link} height="300" allowFullScreen>
            </iframe>
          </div>
        </div>
        <div className='col s12 m6 center'>
          <div className='col s12 center'>
            <Link to='/announcements'>Announcements</Link>
          </div>
          <iframe style={{display: 'inline-block'}}
            src={link} height="200" allowFullScreen>
          </iframe>
        </div>
      </div>
    )
  }
}

export default TrainingVideo
