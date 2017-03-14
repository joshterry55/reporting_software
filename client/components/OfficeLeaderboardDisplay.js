import React from 'react'
import {connect} from 'react-redux'
import { setFlash } from '../actions/flash';
import { totalsales } from '../actions/totalsales';

class OfficeLeaderboardDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.truePerc = this.truePerc.bind(this)
    this.displaySales = this.displaySales.bind(this)
    this.officeName = this.officeName.bind(this)
    this.officeInfo = this.officeInfo.bind(this)
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


  officeName(office) {
    let officeName
    this.props.leaderboardoffices.map( o => {
      if(o.id === office.id) {
        officeName = o.name
      }
    })
    return(officeName)
  }

  officeInfo(office) {
    let currentOffice
    this.props.leaderboardoffices.map( o => {
      if(o.id === office.id) {
        currentOffice = o
      }
    })
    return(currentOffice)
  }

  officeAvatar(office) {
    return(
      <div className='col s0 l4 hide-on-med-and-down' style={{
        height: '40px',
        width: '40px',
        borderRadius: '5px',
        boxShadow: '0 0 2px rgba(0,0,0,0.35)',
        backgroundImage: `url(${office.avatar})`,
        backgroundSize: 'cover',
        display: 'inline-block',
        marginTop: '5px'
       }}></div>
    )
  }

  displaySales() {
    if(this.props.leaderboardofficetotals.length) {
      return this.props.leaderboardofficetotals.map(function(office, i){
        let currentOffice = this.officeInfo(office)
        return(
            <tr className='row' style={{height: '50px', lineHeight: '50px'}} key={office.id}>
              <td className='col s1'>{i + 1}</td>
              <td className='col s2' style={{paddingLeft: '0px'}}>{this.officeAvatar(currentOffice)} <div className='col s12 l7'><span style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>{currentOffice.name}</span></div></td>
              <td className='col s2'>{office.kw.toFixed(2)} {office.last_name}</td>
              <td className='col s1'>{office.site_survey_kw.toFixed(2)}</td>
              <td className='col s1'>{office.sit_down}</td>
              <td className='col s1'>{office.close}</td>
              <td className='col s1'>{office.site_survey}</td>
              <td className='col s1'>{office.cancel}</td>
              <td className='col s1'>{this.truePerc(office)}%</td>
              <td className='col s1'>{this.cancelPerc(office)}%</td>
            </tr>
        );
      }, this);
    }
  }

  // <td className='col s2' style={{paddingLeft: '0px'}}>{this.salesman(user)} <div className='col s12 l7'><span style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>{user.name}</span></div></td>


  render() {
    let kilowatts = 0
    let sitdown = 0
    let close = 0
    let cancel = 0
    let sitesurvey = 0
    let sitesurveykw = 0
    if(this.props.regionsales.length) {
      kilowatts = this.props.officetotalkw['KW'].toFixed(2)
      sitdown = this.props.officetotalsitdown['SD']
      close = this.props.officetotalclose['CL']
      cancel = this.props.officetotalcancel['CA']
      sitesurvey = this.props.officetotalsitesurvey['SS']
      sitesurveykw = this.props.officetotalsitesurveykw['SSKW'].toFixed(2)
    }
    return(
      <div style={styles.tableStyle}>
        <table className='striped'>
          <thead style={{borderBottom: '1px solid black', height: '35px', lineHeight: '30px'}}>
            <tr className='row'>
                <th className='col s1'>Rank</th>
                <th className='col s2'>Office</th>
                <th className='col s2'>KW</th>
                <th className='col s1'>SS/KW</th>
                <th className='col s1'>SD</th>
                <th className='col s1'>CL</th>
                <th className='col s1'>SS</th>
                <th className='col s1'>CA</th>
                <th className='col s1'>T%</th>
                <th className='col s1'>CA%</th>
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
  let { officesales, currentoffice, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown, currentsale, weekdates, leaderboardofficetotals, regionsales, leaderboardoffices, officetotalsitesurveykw } = state
  return { officesales, currentoffice, officetotalcancel, officetotalclose, officetotalkw, officetotalsitesurvey, officetotalsitdown, currentsale, weekdates, leaderboardofficetotals, regionsales, leaderboardoffices, officetotalsitesurveykw }
}

export default connect(mapStateToProps)(OfficeLeaderboardDisplay)
