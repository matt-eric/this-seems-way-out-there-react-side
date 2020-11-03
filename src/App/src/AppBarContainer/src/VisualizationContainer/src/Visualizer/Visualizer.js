import React, { Component } from 'react'
import { PtsCanvas } from 'react-pts-canvas'
import { Pt, Create, Rectangle, Color } from 'pts/dist/es5'
import { connect } from "react-redux";

class VisualizationConfigurator extends PtsCanvas {

  constructor(props) {
    super(props);
    this.noiseLine = []
    this.noise = []
    this.follower = new Pt();
    this.pts = []
  }

  start() {
    const { space } = this
    let line = Create.distributeLinear( [new Pt(0, space.center.y), new Pt(space.width, space.center.y)], 30 );
    let grid = Create.gridPts( space.innerBound, 20, 20 );
    this.noiseLine = Create.noisePts( line, 0.1, 0.1 );
    this.noise = Create.noisePts( grid, 0.05, 0.1, 20, 20 );
    this.follower = space.center;
  }

  animate( time, ftime ) {

    const { space, noiseLine, noise, follower, form } = this;

    const { effectModules } = this.props;

    let ptsSpeed = space.pointer.$subtract( space.center ).divide( space.center ).abs();

    this.follower = follower.add( space.pointer.$subtract( follower ).divide(4) );

    const generateNoise = (behavior, speed) => {
      for(let n=0; n<noise.length; n++){
        noise[n].step( speed * ptsSpeed.x, speed * (1-ptsSpeed.y) );
        form.fillOnly("#123").point( noise[n], Math.abs( noise[n].noise2D() * space.size.x/behavior ) );
      }
    }

    const generateWaveform = (alpha, points, shape) => {
      let waveSpeed = noiseLine.map( (p) => {
        p.step( 0.01*(1-ptsSpeed.x), 0.05*ptsSpeed.y );
        return p.$add( 0, p.noise2D()*space.center.y );
      });
      waveSpeed = waveSpeed.concat( [space.size, new Pt( 1, space.size.y )] );
      form.fillOnly(`rgba(41, 98, 255, ${alpha})`).polygon( waveSpeed );
      form.fill("#76ff03").points( waveSpeed, points, shape);
    }

    const generateGridCells = (focus, columns, rows) => {
      let pts = Create.gridCells( space.innerBound, columns, rows );
      for(let cell=0; cell<pts.length; cell++){
        let magnitude = follower.$subtract( Rectangle.center( pts[cell] ) ).magnitude();
        let scale = Math.min( 1.5, Math.abs( focus - ( 0.7 * magnitude / space.center.y ) ) );
        let rectangle = Rectangle.fromCenter( Rectangle.center(pts[cell]), Rectangle.size(pts[cell]).multiply( scale ) );
        form.fill( Color.HSLtoRGB( Color.hsl( scale*210, 1, 3 ) ).hex ).rect( rectangle );
      }
    }

    const associateInvocation = (effect) => {

      const {
        type,
        settings
      } = effect;

      const foundParameters = {}

      for(let i=0; i<settings.length; i++){
        foundParameters[settings[i]['type']] = settings[i]['value']/1000
      }

      const {
        behavior,
        speed,
        alpha,
        points,
        focus,
        columns,
        rows
      } = foundParameters

      const invocationAssociations = {
        'noise': () => generateNoise( behavior, speed ),
        'waveform': () => generateWaveform( alpha, points, effect.pointShape || 'circle' ),
        'gridCells': () => generateGridCells( focus, columns, rows )
      };

      invocationAssociations[type]();

    };

    for(let i=0; i<effectModules.length; i++){
      if(!effectModules[i]['params'].bypass){
        associateInvocation(effectModules[i]['params']);
      }
    }

  }

}

class Visualizer extends Component {
  render () {
    return (
      <>
        <VisualizationConfigurator
          background="#0c9"
          name="pts-tester"
          style={{ opacity: 0.95, height: '100vh' }}
          effectModules={this.props.effectModules}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    effectModules: state.effectBus.effectModules,
  };
};

export default connect(
  mapStateToProps,
  null
)(Visualizer);
