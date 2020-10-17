export const defaultEffects = [
  {
    type: 'noise',
    displayName: 'Noise',
    settings: {}
  },
  {
    type: 'waveform',
    displayName: 'Waveform',
    pointShape: "circle",
    settings: {
      alpha: {
        displayName: 'Alpha',
        value: .75,
        max: .99,
        step: .01
      },
      points: {
        displayName: 'Point Radius',
        value: 3,
        max: 15,
        min: 1,
        step: 1
      },
    }
  },
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
]
