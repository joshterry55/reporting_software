import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'


class ThreeGraph extends React.Component {
  constructor(props) {
    super(props)

  }
  
  componentDidMount() {
    let thisMonth = this.props.threeMonth.site_survey
    let third = 'January'
    let mytest = 2
    let ctx = this.refs.myChart
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [third, "February", "March"],
          datasets: [{
              label: '# of Site Surveys',
              data: [thisMonth, 12, 3, 5, 2],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
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
    let thisMonth = this.props.threeMonth.site_survey
    let third = 'January'
    let mytest = 2
    let ctx = this.refs.myChart
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [third, "February", "March"],
          datasets: [{
              label: '# of Site Surveys',
              data: [thisMonth, 12, 3, 5, 2],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
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
