export const defaultEffects = [
  {
    type: 'noise',
    displayName: 'Noise',
    bypass: false,
    settings: {
      behavior: {
        displayName: 'Behavior',
        value: 10,
        max: 40,
        min: 1,
        step: 1
      },
      speed: {
        displayName: 'Speed',
        value: .04,
        max: .05,
        min: .001,
        step: .001
      },
    }
  },
  {
    type: 'waveform',
    displayName: 'Waveform',
    pointShape: "circle",
    bypass: false,
    settings: {
      alpha: {
        displayName: 'Alpha',
        value: .75,
        max: .99,
        step: .01
      },
      points: {
        displayName: 'Point Rdius',
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
    bypass: false,
    settings: {
      focus: {
        displayName: 'Focus',
        value: .87,
        max: .99,
        step: .01
      },
      columns: {
        displayName: 'Columns',
        value: 15,
        max: 15,
        min: 1,
        step: 1
      },
      rows: {
        displayName: 'Rows',
        value: 15,
        max: 15,
        min: 1,
        step: 1
      }
    }
  },
]
