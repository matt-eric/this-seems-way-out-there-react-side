const effectBus = (state = {
  expanded: false,
  effectModules: undefined,
  existingEffects: [
    {
      type: 'noiseGrid',
      params: {}
    },
    {
      type: 'waveform',
      params: {}
    },
    {
      type: 'cellBlocks',
      params: {
        sparkleFocus: .87,
      }
    },
  ],
}, action) => {
  switch(action.type){
    case `SET_EFFECT_BUS_DATA`:
      return {
        ...state,
        [action.payload.type]: action.payload.data
      }
    case `SET_EFFECT_BUS_STATE`:
      return action.payload
    default:
      return state
  }
}

export default effectBus
