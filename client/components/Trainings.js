import React from 'react'
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux'
import TrainingSections from './TrainingSections'

class Trainings extends React.Component {
  constructor(props) {
    super(props)

    this.state = { addCategory: false }
    this.state = { editCategory: false }

    this.createCategory = this.createCategory.bind(this)
    this.toggleAdd = this.toggleAdd.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.displayCategories = this.displayCategories.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.adminCheck = this.adminCheck.bind(this)
  }

  componentDidMount() {
    if(!this.props.trainingcategories.length) {
      let companyId = this.props.assignedcompany.id
      $.ajax({
        url: `/api/company/${companyId}/categories`,
        type: 'GET',
        dataType: 'JSON'
      }).done( categories => {
        this.props.dispatch({ type: 'TRAINING_CATEGORIES', categories })
      }).fail( data => {
        console.log(data);
      });
    }
  }

  createCategory(e) {
    e.preventDefault()
    let name = this.refs.categoryName.value
    let companyId = this.props.assignedcompany.id
    $.ajax({
      url: '/api/training_categories',
      type: 'POST',
      dataType: 'JSON',
      data: { training_category: {
        name: name,
        company_id: companyId
      }}
    }).done( category => {
      this.props.dispatch({type: 'ADD_TRAINING_CATEGORY', category})
      this.refs.categoryForm.reset()
      this.toggleAdd()
    }).fail( data => {
    })
  }

  editCategory(e, id) {
    e.preventDefault()
    let name = this.refs.editCategoryName.value
    $.ajax({
      url: `/api/training_categories/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { training_category: {
        name: name
      }}
    }).done( category => {
      this.props.dispatch({type: 'UPDATE_TRAINING_CATEGORY', category})
      this.refs.editCategoryForm.reset()
      this.toggleEdit()
    }).fail( data => {
    })
  }

  toggleAdd() {
    this.setState({addCategory: !this.state.addCategory})
  }

  display() {
    if(this.props.user.role === 'Admin') {
      if(this.state.addCategory) {
        return(
          <div className='col s12'>
            <div className='col s12 m4 offset-m4'>
              <form ref='categoryForm' onSubmit={this.createCategory}>
                <div className='col s10 '>
                  <input ref='categoryName' placeholder='New Category' autoFocus required />
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
            <span onClick={this.toggleAdd} className='add-sale' style={{cursor: 'pointer', color: '#60b9e8'}}>+ Add Category</span>
          </div>
        )
      }
    }
  }

  deleteCategory(id) {
    let confirmed = confirm('Deleting this category will delete all videos that belong to it. Delete anyway?')
    if(confirmed) {
      $.ajax({
        type: 'DELETE',
        url: `/api/training_categories/${id}`,
        dataType: 'JSON'
      }).done( category => {
        this.props.dispatch({type: 'REMOVE_TRAINING_CATEGORY', category})
      }).fail( data => {

      })
    }
  }

  toggleEdit() {
    this.setState({editCategory: !this.state.editCategory})
  }

  setCategory(category) {
    this.props.dispatch({type: 'CURRENT_CATEGORY', category})
    this.toggleEdit()
  }

  adminCheck(category) {
    if(this.props.user.role === 'Admin') {
      return(
        <div>
          <i className="tiny material-icons edit-icon" onClick={() => this.setCategory(category)} style={{cursor: 'pointer'}} title='Edit Category'>edit</i><i style={{cursor: 'pointer'}} className="tiny material-icons delete-icon" title="Delete Category" onClick={() => this.deleteCategory(category.id)}>delete</i>
        </div>
      )
    }
  }

  displayCategories() {
    if(this.props.trainingcategories.length) {
      return this.props.trainingcategories.map( category => {
        if(this.state.editCategory) {
          if(this.props.currentcategory.id === category.id) {
            return(
              <div  key={category.id} className='col s12'>
                <div className='col s12 m4 offset-m4'>
                  <form ref='editCategoryForm' onSubmit={(e) => this.editCategory(e, category.id)}>
                    <div className='col s10 '>
                      <input ref='editCategoryName' style={{fontSize: '25px'}} placeholder={category.name} defaultValue={category.name} autoFocus required />
                    </div>
                    <div className='col s2'>
                      <input className='btn' style={{backgroundColor: '#444'}} type='submit' value='Update' />
                    </div>
                  </form>
                  <div className='center col s12' style={{marginBottom: '10px'}}>
                    <span onClick={this.toggleEdit} className='cancel' style={{cursor: 'pointer', color: '#ccc', padding: '5px 10px', borderRadius: '3px'}}>Cancel</span>
                  </div>
                </div>
                <div className='col s12' style={{marginBottom: '10px'}}>
                  <TrainingSections current={category} />
                </div>
              </div>
            )
          } else {
            return(
              <div key={category.id} className='col s12'>
                <div className='col s12 m4 offset-m4 center'>
                  <div style={{fontSize: '35px'}}>{category.name}</div>
                </div>
                <div className='col s12' style={{marginBottom: '10px'}}>
                  <TrainingSections current={category} />
                </div>
              </div>
            )
          }
        } else {
          return(
            <div  key={category.id} className='col s12'>
              <div className='col s12 m4 offset-m4 center'>
                <div style={{fontSize: '35px'}}><b>{category.name}</b></div>
                {this.adminCheck(category)}
              </div>
              <div className='col s12' style={{marginBottom: '10px'}}>
                <TrainingSections current={category} />
              </div>
            </div>
          );
        }
      });
    }
  }

  render() {
    let companyName = this.props.assignedcompany.name
    return(
      <div  className='row '>
        <div className='col s12 m10 offset-m1 white-container'>
          <div className='center' style={{paddingTop: '15px'}}>
            <span style={{fontSize: '50px'}}>{companyName} Training</span>
          </div>
          <div style={{marginBottom: '20px'}}>
            {this.display()}
          </div>
          <div>
            {this.displayCategories()}
          </div>
          <div className='col s12'><br /></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { assignedcompany, trainingcategories, currentcategory, user } = state
  return { assignedcompany, trainingcategories, currentcategory, user }
}


export default connect(mapStateToProps)(Trainings)
