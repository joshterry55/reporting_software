import React from 'react'
import { connect } from 'react-redux'
import DropZone from 'react-dropzone';
import request from 'superagent';
require('superagent-rails-csrf')(request)
import { Link, browserHistory } from 'react-router';

class TrainingSections extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addSection: false }
    this.state = { editSection: false }
    this.state = { avatar: [this.props.user.avatar]}

    this.toggleAdd = this.toggleAdd.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.createSection = this.createSection.bind(this)
    this.displaySections = this.displaySections.bind(this)
    this.setSection = this.setSection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.editSection = this.editSection.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount() {
    if(!this.props.trainingsections.length) {
      let companyId = this.props.assignedcompany.id
      $.ajax({
        url: `/api/company/${companyId}/sections`,
        type: 'GET',
        dataType: 'JSON'
      }).done( sections => {
        this.props.dispatch({ type: 'TRAINING_SECTIONS', sections })
      }).fail( data => {
        console.log(data);
      });
    }
  }

  createSection(e) {
    e.preventDefault()
    let name = this.refs.sectionName.value
    let categoryId = this.props.current.id
    let companyId = this.props.assignedcompany.id
    $.ajax({
      url: '/api/training_sections',
      type: 'POST',
      dataType: 'JSON',
      data: { training_section: {
        name: name,
        training_category_id: categoryId,
        company_id: companyId
      }}
    }).done( section => {
      this.props.dispatch({type: 'ADD_TRAINING_SECTION', section})
      this.refs.sectionForm.reset()
      this.toggleAdd()
    }).fail( data => {
    })
  }

  editSection(e, id) {
    e.preventDefault()
    let name = this.refs.editSectionName.value
    $.ajax({
      url: `/api/training_sections/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { training_section: {
        name: name
      }}
    }).done( section => {
      this.props.dispatch({type: 'UPDATE_TRAINING_SECTION', section})
      this.refs.editSectionForm.reset()
      this.toggleEdit()
    }).fail( data => {
    })
  }

  toggleAdd() {
    this.setState({addSection: !this.state.addSection})
  }

  toggleEdit() {
    this.setState({editSection: !this.state.editSection})
  }

  display() {
    if(this.props.user.role === 'Admin') {
      if(this.state.addSection) {
        return(
          <div className='col s12'>
            <div className='col s12 m4 offset-m4'>
              <form ref='sectionForm' onSubmit={this.createSection}>
                <div className='col s10 '>
                  <input ref='sectionName' placeholder='New Section' autoFocus required />
                </div>
                <div className='col s2'>
                  <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Add' />
                </div>
              </form>
              <div className='center col s12' style={{marginBottom: '10px'}}>
                <span onClick={this.toggleAdd} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <div className="center">
            <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: '#60b9e8'}}>+ Add Section</span>
          </div>
        )
      }
    }
  }

  deleteSection(id) {
    let confirmed = confirm('Deleting this section will delete all videos that belong to it. Delete anyway?')
    if(confirmed) {
      $.ajax({
        type: 'DELETE',
        url: `/api/training_sections/${id}`,
        dataType: 'JSON'
      }).done( section => {
        this.props.dispatch({type: 'REMOVE_TRAINING_SECTION', section})
      }).fail( data => {

      })
    }
  }

  setSection(section) {
    this.props.dispatch({type: 'CURRENT_SECTION', section})
    this.toggleEdit()
  }

  adminCheck(section) {
    if(this.props.user.role === 'Admin') {
      return(
        <div>
          <i className="tiny material-icons edit-icon" onClick={() => this.setSection(section)} style={{cursor: 'pointer'}} title='Edit Section'>edit</i><i style={{cursor: 'pointer'}} className="tiny material-icons delete-icon" title="Delete Section" onClick={() => this.deleteSection(section.id)}>delete</i>
        </div>
      )
    }
  }

  onDrop = (files) => {
    let id = this.props.currentsection.id
    let employee = this.props.user
    let file = files[0];
    let req = request.put(`api/training_sections/${id}/avatar`);
    req.setCsrfToken();
    req.attach('avatar', file)
    req.end( (err, res) => {
      if(res.body) {
        this.setState({avatar: [res.body.avatar]})
      }
    })
  }



  displaySections(current) {
    if(this.props.trainingsections.length) {
      return this.props.trainingsections.map( section => {
        if(current.id === section.training_category_id) {
          if(this.state.editSection) {
            if(this.props.currentsection.id === section.id) {
              return(
                <div  key={section.id} className='col s12 m4 l3' style={{marginBottom: '20px' }}>
                  <div className='col s12'>
                    <form ref='editSectionForm' onSubmit={(e) => this.editSection(e, section.id)}>
                      <div className='col s12 '>
                        <input ref='editSectionName' style={{fontSize: '15px'}} placeholder={section.name} defaultValue={section.name} autoFocus required />
                      </div>
                      <div className='col s12 center' style={{marginBottom: '10px'}}>
                        <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Update' />
                      </div>
                    </form>
                    <div className='center col s12' style={{marginBottom: '0px'}}>
                      <span onClick={this.toggleEdit} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
                    </div>
                    <div  className='col s12' style={{height: '75px', marginBottom: '15px', position: 'relative', paddingTop: '0px'}}>
                      <div style={{
                        backgroundImage: `url(${section.avatar})`,
                        width: '100%',
                        height: '100%',
                        maxWidth: '75px',
                        display: 'block',
                        backgroundSize: 'cover',
                        borderRadius: '10px',
                        boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                        margin: '8px auto',
                        backgroundColor: 'rgba(0,0,0,0.25)',
                        zIndex: '1',
                      }}>
                      <DropZone className='edit-icon' style={{
                          backgroundColor: '#aaa',
                          backgroundImage: `url('http://res.cloudinary.com/dk2bj79p0/image/upload/v1487276928/k8l3cfeaxmgdjja4yyah.jpg')`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center center',
                          width: '100%',
                          height: '100%',
                          maxWidth: '75px',
                          display: 'block',
                          borderRadius: '10px',
                          margin: '0px auto',
                          position: 'relative',
                          opacity: '0.75',
                          zIndex: '2',
                          cursor: 'pointer'
                        }} multiple={false} onDrop={this.onDrop} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            } else {
              return(
                <div key={section.id} className='col s12 m4 l3' style={{marginBottom: '20px'}}>
                  <div style={{height: '200px', marginBottom: '10px'}}>
                    <div style={{
                        backgroundImage: `url(${section.avatar})`,
                        width: '100%',
                        height: '100%',
                        maxWidth: '250px',
                        display: 'block',
                        backgroundSize: 'cover',
                        borderRadius: '5px',
                        boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                        margin: '10px auto'
                      }}>
                    </div>
                  </div>
                  <div className='col s12 center'>
                    <div style={{fontSize: '18px'}}><b><Link className='section-link' to={`/trainingvideos/${section.id}`}>{section.name}</Link></b></div>
                    {this.adminCheck(section)}
                  </div>
                </div>
              )
            }
          } else {
            return(
              <div  key={section.id} className='col s12 m4 l3' style={{marginBottom: '20px'}}>
                <div style={{height: '200px', marginBottom: '10px'}}>
                  <div style={{
                      backgroundImage: `url(${section.avatar})`,
                      width: '100%',
                      height: '100%',
                      maxWidth: '250px',
                      display: 'block',
                      backgroundSize: 'cover',
                      borderRadius: '5px',
                      boxShadow: '5px 5px 5px rgba(0,0,0,0.25)',
                      margin: '10px auto'
                    }}>
                  </div>
                </div>
                <div className='col s12 center'>
                  <div style={{fontSize: '18px'}}><b><Link className='section-link' to={`/trainingvideos/${section.id}`}>{section.name}</Link></b></div>
                  {this.adminCheck(section)}
                </div>
              </div>
            );
          }
        }
      });
    }
  }

  render() {
    let currentCategory = this.props.current
    return(
      <div>
        {this.display()}
        <br />
        {this.displaySections(currentCategory)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { user, trainingsections, assignedcompany, currentsection } = state
  return { user, trainingsections, assignedcompany, currentsection }
}

export default connect(mapStateToProps)(TrainingSections)
