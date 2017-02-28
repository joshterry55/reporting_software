import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'


class ThreeGraph extends React.Component {
  constructor(props) {
    super(props)

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
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [sixMonths[0], sixMonths[1], sixMonths[2], sixMonths[3], sixMonths[4], sixMonths[5]],
          datasets: [{
              label: '# of Site Surveys',
              data: [sixMonthKw[sixMonths[0]], sixMonthKw[sixMonths[1]], sixMonthKw[sixMonths[2]], sixMonthKw[sixMonths[3]], sixMonthKw[sixMonths[4]], sixMonthKw[sixMonths[5]]],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
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
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [sixMonths[0], sixMonths[1], sixMonths[2], sixMonths[3], sixMonths[4], sixMonths[5]],
          datasets: [{
              label: '# of Site Surveys',
              data: [sixMonthKw[sixMonths[0]], sixMonthKw[sixMonths[1]], sixMonthKw[sixMonths[2]], sixMonthKw[sixMonths[3]], sixMonthKw[sixMonths[4]], sixMonthKw[sixMonths[5]]],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
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
        <div className='col s12 m10 offset-m1 white-container'>
          <canvas ref="myChart" width="400" height="200px"></canvas>
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
