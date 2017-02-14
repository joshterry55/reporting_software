
const trainingcategories = (state = [], action) => {
  switch(action.type) {
    case 'TRAINING_CATEGORIES':
      return action.categories
    case 'ADD_TRAINING_CATEGORY':
      return [...state, action.category]
    case 'UPDATE_TRAINING_CATEGORY':
      let indexUpdate = state.findIndex( s => s.id === action.category.id)
      return [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.category
      ]
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
