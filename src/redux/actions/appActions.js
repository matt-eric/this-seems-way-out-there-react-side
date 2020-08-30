const setAppData = (type, data) => {
  return {
    type: `SET_APP_DATA`,
    payload: {
      data: data,
      type: type
    }
  }
}

const setAppState = (data) => {
  return {
    type: `SET_APP_STATE`,
    payload: data
  }
}

export default {
  setAppData,
  setAppState
}
