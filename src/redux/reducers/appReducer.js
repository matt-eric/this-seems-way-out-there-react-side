const app = (state = {}, action) => {
  switch(action.type){
    case `SET_APP_DATA`:
      return {
        ...state,
        [action.payload.type]: action.payload.data
      }
    case `SET_APP_STATE`:
      return action.payloads
    default:
      return state
  }
}

export default app
