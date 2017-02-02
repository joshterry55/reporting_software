import React from 'react'
import { connect } from 'react-redux'
import { clearFlash } from '../actions/flash'

const fadeFlash = (dispatch) => {
  setTimeout( () => {
    dispatch(clearFlash())
  }, 5500)
}

const xFlash = (dispatch) => {
  dispatch(clearFlash())
}

const Flash = ({ flash, dispatch }) => {
  if(flash.message) {
    return(
      <div id="alert" className={`alert alert-${flash.msgType}`}>
        <a style={{ cursor: 'pointer' }} className='close' onClick={() => xFlash(dispatch) }>
          &times;
        </a>
        {flash.message}
        { fadeFlash(dispatch) }
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return { flash: state.flash }
}

export default connect(mapStateToProps)(Flash)
