
const trainingsections = (state = [], action) => {
  switch(action.type) {
    case 'TRAINING_SECTIONS':
      return action.sections
    case 'ADD_TRAINING_SECTION':
      return [...state, action.section]
    case 'UPDATE_TRAINING_SECTION':
      let indexUpdate = state.findIndex( s => s.id === action.section.id)
      return [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.section
      ]
    case 'REMOVE_TRAINING_SECTION':
    let index = state.findIndex( s => s.id === action.section.id)
      return [
      ...state.slice(0, index),
      ...state.slice(index + 1)
      ]
    case 'RESET_TRAINING_SECTIONS':
      return action.sections = []
    default:
      return state;
  }
}

export default trainingsections
