import React from 'react'
import { connect } from 'react-redux'


class Announcements extends React.Component {
  constructor(props) {
    super(props)

    this.submitSearch = this.submitSearch.bind(this)
  }

  submitSearch(e) {
    e.preventDefault()
    let searchValue = this.refs.searchInput.value
    let id = this.props.assignedcompany.id
    $.ajax({
      type: 'GET',
      url: '/api/company/sales/search',
      dataType: 'JSON',
      data: {
        search: searchValue,
        id: id
      }
    }).done( results => {
      debugger
    }).fail( data => {

    })
  }

  searchBar() {
    return(
      <div style={{height: '75px'}}>
        <div style={{
          backgroundImage: `url('http://img.youtube.com/vi/UAWcs5H-qgQ/0.jpg')`,
          width: '100%',
          height: '100%',
          maxWidth: '100px',
          display: 'block',
          backgroundSize: 'cover',
          borderRadius: '10px',
          boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
          margin: '8px auto',
          zIndex: '1',
        }}></div>
      </div>
      // <nav>
      //   <div className="nav-wrapper">
      //     <form onSubmit={this.submitSearch}>
      //       <div className="input-field">
      //         <input id="search" type="search" ref='searchInput' required />
      //         <label className="label-icon" for="search"><i className="material-icons">search</i></label>
      //         <i className="material-icons">close</i>
      //       </div>
      //     </form>
      //   </div>
      // </nav>
    )
  }

  render() {
    return(
      <div className='row'>
        <div className='col s12 m10 offset-m1 white-container'>
          Announcement Page
          {this.searchBar()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(Announcements)
