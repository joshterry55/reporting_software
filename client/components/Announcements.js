import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'
import AnnouncementsNav from './AnnouncementsNav'


class Announcements extends React.Component {
  constructor(props) {
    super(props)


  }

  // componentDidMount() {
  //   let mytest = 2
  //   let ctx = this.refs.myChart
  //   var myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //         labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
  //         datasets: [{
  //             label: '# of Site Surveys',
  //             data: [mytest, 25, 3, 5, 2],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //             ],
  //             borderColor: [
  //                 'rgba(255,99,132,1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     beginAtZero:true
  //                 }
  //             }]
  //         }
  //     }
  // });
  // }
  //
  // submitSearch(e) {
  //   e.preventDefault()
  //   let searchValue = this.refs.searchInput.value
  //   let id = this.props.assignedcompany.id
  //   $.ajax({
  //     type: 'GET',
  //     url: '/api/company/sales/search',
  //     dataType: 'JSON',
  //     data: {
  //       search: searchValue,
  //       id: id
  //     }
  //   }).done( results => {
  //     debugger
  //   }).fail( data => {
  //
  //   })
  // }
  //
  // searchBar() {
  //   return(
  //     // <div style={{height: '75px'}}>
  //     //   <div style={{
  //     //     backgroundImage: `url('http://img.youtube.com/vi/UAWcs5H-qgQ/0.jpg')`,
  //     //     width: '100%',
  //     //     height: '100%',
  //     //     maxWidth: '100px',
  //     //     display: 'block',
  //     //     backgroundSize: 'cover',
  //     //     borderRadius: '10px',
  //     //     boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
  //     //     margin: '8px auto',
  //     //     zIndex: '1',
  //     //   }}></div>
  //     // </div>
  //     <nav>
  //       <div className="nav-wrapper">
  //         <form onSubmit={this.submitSearch}>
  //           <div className="input-field">
  //             <input id="search" type="search" ref='searchInput' required />
  //             <label className="label-icon" for="search"><i className="material-icons">search</i></label>
  //             <i className="material-icons">close</i>
  //           </div>
  //         </form>
  //       </div>
  //     </nav>
  //   )
  // }
  //
  // check() {
  //   let color = this.refs.colorpicked.value
  //   debugger
  // }
  //
  // tester( ) {
  //   return(
  //     <div>
  //       <form onSubmit={this.check}>
  //         <input type='color' ref='colorpicked' />
  //         <input type='submit' />
  //       </form>
  //     </div>
  //   )
  // }

  render() {
    return(
      <div className='row'>
        <div className='col s12 center' style={{backgroundColor: `${this.props.assignedcompany.secondary_nav_color}`, marginTop: '0px', height: '68px'}}>
          <div style={{marginTop: '19px', marginBottom: '10px'}}>
            <span style={{fontSize: '20px', color: `${this.props.assignedcompany.secondary_text}`, padding: '10px 30px'}}>
              Announcements
            </span>
          </div>
        </div>
        <div className='col s12 m10 offset-m1 white-container'>
        </div>
      </div>
    )
  }
}

// <div className='col s12 m10 offset-m1 white-container'>
//   <canvas ref="myChart" width="400" height="50px"></canvas>
// </div>

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(Announcements)
