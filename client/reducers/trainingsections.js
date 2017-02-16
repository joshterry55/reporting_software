
const trainingsections = (state = [], action) => {
  switch(action.type) {
    case 'TRAINING_SECTIONS':
      let allSections = action.sections
      let sortedSections = allSections.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedSections
    case 'ADD_TRAINING_SECTION':
      let addedSections = [...state, action.section]
      let sortedAddedSections = addedSections.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedAddedSections
    case 'UPDATE_TRAINING_SECTION':
      let indexUpdate = state.findIndex( s => s.id === action.section.id)
      let updatedSections = [
        ...state.slice(0, indexUpdate),
        ...state.slice(indexUpdate + 1),
        action.section
      ]
      let sortedUpdatedSections = updatedSections.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      })
      return sortedUpdatedSections
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
