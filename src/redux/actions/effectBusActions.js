const setEffectBusData = (type, data) => {
  return {
    type: `SET_EFFECT_BUS_DATA`,
    payload: {
      data: data,
      type: type
    }
  }
}

const setEffectBusState = (data) => {
  return {
    type: `SET_EFFECT_BUS_STATE`,
    payload: data
  }
}

export default {
  setEffectBusData,
  setEffectBusState
}
