import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'


class ThreeGraph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {myChart: 0}
  }

  componentDidMount() {
    let sixMonths = []

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date();
    let d;
    let month;

    for(var i = 5; i > -1; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month = monthNames[d.getMonth()];
      sixMonths.push(month)
    }
    let sixMonthKw = this.props.sixMonth
    let mytest = 2
    let ctx = this.refs.myChart
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [sixMonths[0], sixMonths[1], sixMonths[2], sixMonths[3], sixMonths[4], sixMonths[5]],
          datasets: [{
              label: '# of Site Surveys',
              data: [sixMonthKw[sixMonths[0]], sixMonthKw[sixMonths[1]], sixMonthKw[sixMonths[2]], sixMonthKw[sixMonths[3]], sixMonthKw[sixMonths[4]], sixMonthKw[sixMonths[5]]],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  this.setState({myChart: myChart})
  }

  componentDidUpdate() {
    let sixMonths = []

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date();
    let d;
    let month;

    for(var i = 5; i > -1; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month = monthNames[d.getMonth()];
      sixMonths.push(month)
    }
    let sixMonthKw = this.props.sixMonth

    let ctx = this.refs.myChart
    window.myChart.destroy()
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [sixMonths[0], sixMonths[1], sixMonths[2], sixMonths[3], sixMonths[4], sixMonths[5]],
          datasets: [{
              label: '# of Site Surveys',
              data: [sixMonthKw[sixMonths[0]], sixMonthKw[sixMonths[1]], sixMonthKw[sixMonths[2]], sixMonthKw[sixMonths[3]], sixMonthKw[sixMonths[4]], sixMonthKw[sixMonths[5]]],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });

  }


  render() {
    return(
      <div className='row'>
        <div className='col s12 white-container' id='graph-container' style={{border: '2px solid #aaa', padding: '0px', margin: '0px'}}>
          <canvas ref="myChart" id='myGraph' width="500" height="400px"></canvas>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, assignedcompany } = state
  return { user, assignedcompany }
}

export default connect(mapStateToProps)(ThreeGraph)
