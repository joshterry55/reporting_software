
const trainingcategories = (state = [], action) => {
  switch(action.type) {
    case 'TRAINING_CATEGORIES':
      let allCategories = action.categories
      let sortedCategories = allCategories.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedCategories
    case 'ADD_TRAINING_CATEGORY':
      let addedCategories = [...state, action.category]
      let sortedAddedCategories = addedCategories.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedAddedCategories
    case 'UPDATE_TRAINING_CATEGORY':
      let indexUpdate = state.findIndex( s => s.id === action.category.id)
      let updatedCategories = [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.category
      ]
      let sortedUpdatedCategories = updatedCategories.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedUpdatedCategories
    case 'REMOVE_TRAINING_CATEGORY':
    let index = state.findIndex( s => s.id === action.category.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'RESET_TRAINING_CATEGORIES':
      return action.categories = []
    default:
      return state;
  }
}

export default trainingcategories
