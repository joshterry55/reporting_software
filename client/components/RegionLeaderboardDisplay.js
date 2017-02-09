import React from 'react'
import {connect} from 'react-redux'
import { setFlash } from '../actions/flash';
import { totalsales } from '../actions/totalsales';

class RegionLeaderboardDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.truePerc = this.truePerc.bind(this)
    this.displaySales = this.displaySales.bind(this)
    this.regionName = this.regionName.bind(this)
  }

  truePerc(sale) {
    let siteSurvey = sale.site_survey
    let sitDown = sale.sit_down
    if(sitDown === 0) {
      return(
        0
      )
    } else if(siteSurvey === 0) {
      return(
        0
      )
    } else {
      return(
      ((siteSurvey / sitDown) * 100).toFixed(1)
      )
    }

  }

  cancelPerc(sale) {
    let cancel = sale.cancel
    let siteSurvey = sale.site_survey
    if(siteSurvey === 0) {
      return(
        0
      )
    } else if(cancel === 0) {
      return(
        0
      )
    } else {
      return(
      ((cancel / siteSurvey) * 100).toFixed(1)
      )
    }
  }

  regionName(region) {
    let regionName
    this.props.leaderboardregions.map( r => {
      if(r.id === region.id) {
        regionName = r.name
      }
    })
    return(regionName)
  }

  displaySales() {
    if(this.props.leaderboardregiontotals.length) {
      return this.props.leaderboardregiontotals.map(function(region, i){
        return(
            <tr className='row' key={region.id}>
              <td className='col s1'>{i + 1}</td>
              <td className='col s2'>{this.regionName(region)}</td>
              <td className='col s2'>{region.kw.toFixed(2)}</td>
              <td className='col s1'>{region.site_survey_kw}</td>
              <td className='col s1'>{region.sit_down}</td>
              <td className='col s1'>{region.close}</td>
              <td className='col s1'>{region.site_survey}</td>
              <td className='col s1'>{region.cancel}</td>
              <td className='col s1'>{this.truePerc(region)}%</td>
              <td className='col s1'>{this.cancelPerc(region)}%</td>
            </tr>
        );
      }, this);
    }
  }



  render() {
    let kilowatts = 0
    let sitdown = 0
    let close = 0
    let cancel = 0
    let sitesurvey = 0
    let sitesurveykw = 0
    if(this.props.companysales.length) {
      kilowatts = this.props.officetotalkw['KW'].toFixed(2)
      sitdown = this.props.officetotalsitdown['SD']
      close = this.props.officetotalclose['CL']
      cancel = this.props.officetotalcancel['CA']
      sitesurvey = this.props.officetotalsitesurvey['SS']
      sitesurveykw = this.props.officetotalsitesurveykw['SSKW']
    }
    return(
      <div style={styles.tableStyle}>
        <table className='striped'>
          <thead style={{borderBottom: '1px solid black', height: '30px', lineHeight: '30px'}}>
            <tr className='row'>
                <th className='col s1'>Rank</th>
                <th className='col s2'>Region</th>
                <th className='col s2'>KW</th>
                <th className='col s1'>SS/KW</th>
                <th className='col s1'>SD</th>
                <th className='col s1'>CL</th>
                <th className='col s1'>SS</th>
                <th className='col s1'>CA</th>
                <th className='col s1'>T%</th>
                <th className='col s1'>C%</th>
            </tr>
          </thead>
          <tbody id="products">
            {this.displaySales()}
            <tr className='row' style={{ height: '30px', lineHeight: '30px'}}>
              <td className='col s2'><b>TOTAL:</b></td>
              <td className='col s1'></td>
              <td className='col s2'><b>{kilowatts}</b></td>
              <td className='col s1'><b>{sitesurveykw}</b></td>
              <td className='col s1'><b>{sitdown}</b></td>
              <td className='col s1'><b>{close}</b></td>
              <td className='col s1'><b>{sitesurvey}</b></td>
              <td className='col s1'><b>{cancel}</b></td>
              <td className='col s1'></td>
              <td className='col s1'></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const styles = {
  customLabel: {
    padding: '0px',
    margin: '0px',
    fontSize: '12px',
    color: 'gray'
  },
  modalStyling: {
    width: '80%',
    maxWidth: '500px',
    border: '1px solid #333',
    borderRadius: '10px',
  },
  modalFooter: {
    position: 'absolute',
    bottom: '0px',
  },
  modalHeader: {
    width: '100%',
    height: '60px',
    lineHeight: '61px',
    color: '#f2f7f7',
    fontSize: '35px',
    textShadow: '0 0 5px rgba(0,0,0,0.50)',
    backgroundColor: "#60b9e8",
    borderBottom: '1px solid #333',
    boxShadow: '0 0 6px #000',
    position: 'relative',
  },
  tableStyle: {
    minWidth: '600px'
  }
}

const mapStateToProps = (state) => {
  let { officesales, currentoffice, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown, currentsale, weekdates, leaderboardregiontotals, companysales, leaderboardregions, officetotalsitesurveykw } = state
  return { officesales, currentoffice, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown, currentsale, weekdates, leaderboardregiontotals, companysales, leaderboardregions, officetotalsitesurveykw }
}

export default connect(mapStateToProps)(RegionLeaderboardDisplay)
