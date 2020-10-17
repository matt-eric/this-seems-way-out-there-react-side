export const defaultEffects = [
  {
    type: 'gridCells',
    displayName: 'Grid Cells',
    settings: {
      focus: {
        displayName: 'Focus',
        value: .87,
        max: .99,
        step: .01
      }
    }
  },
  {
    type: 'noise',
    displayName: 'Noise',
    settings: {}
  },
  {
    type: 'waveform',
    displayName: 'Waveform',
    settings: {
      alpha: {
        displayName: 'Alpha',
        value: .75,
        max: .99,
        step: .01
      }
    }
  },
]
