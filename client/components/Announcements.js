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
      <div></div>
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
