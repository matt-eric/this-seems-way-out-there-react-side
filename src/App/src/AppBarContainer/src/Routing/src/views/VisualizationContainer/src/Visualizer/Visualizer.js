import React, { Component } from 'react'
import { PtsCanvas } from 'react-pts-canvas'
import { Pt, Create, Rectangle, Circle, Color } from 'pts/dist/es5'
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
    let ln = Create.distributeLinear( [new Pt(0, this.space.center.y), new Pt(this.space.width, this.space.center.y)], 30 );
    let gd = Create.gridPts( this.space.innerBound, 20, 20 );
    this.noiseLine = Create.noisePts( ln, 0.1, 0.1 );
    this.noise = Create.noisePts( gd, 0.05, 0.1, 20, 20 );
    this.follower = this.space.center;
  }

  animate( time, ftime ) {

    let speed = this.space.pointer.$subtract( this.space.center ).divide( this.space.center ).abs();

    this.follower = this.follower.add( this.space.pointer.$subtract( this.follower ).divide(4) );

    const generatenoise = (space, form, noise) => {
      for(let n=0; n<noise.length; n++){
        noise[n].step( 0.08*speed.x, 0.08*(1-speed.y) );
        form.fillOnly("#123").point( noise[n], Math.abs( noise[n].noise2D() * space.size.x/10 ) );
      }
    }

    const generateWaveform = (space, form, noiseLine, alpha, points, shape) => {
      let nps = noiseLine.map( (p) => {
        p.step( 0.01*(1-speed.x), 0.05*speed.y );
        return p.$add( 0, p.noise2D()*space.center.y );
      });
      nps = nps.concat( [space.size, new Pt( 1, space.size.y )] );
      form.fillOnly(`rgba(41, 98, 255, ${alpha})`).polygon( nps );
      form.fill("#76ff03").points( nps, points, shape);
    }

    const generateGridCells = (space, form, follower, focus, columns, rows) => {
      let pts = Create.gridCells( this.space.innerBound, columns, rows );
      for(let c=0; c<pts.length; c++){
        let mag = follower.$subtract( Rectangle.center( pts[c] ) ).magnitude()
        let scale = Math.min( 1.5, Math.abs( focus - ( 0.7 * mag / space.center.y ) ) );
        let r = Rectangle.fromCenter( Rectangle.center(pts[c]), Rectangle.size(pts[c]).multiply( scale ) );
        form.fill( Color.HSLtoRGB( Color.hsl( scale*210, 1, 3 ) ).hex ).rect( r );
      }
    }

    const associateInvocation = (effect) => {
      const { type, settings } = effect
      const invocationAssociations = {
        'noise': () => generatenoise(this.space, this.form, this.noise),
        'waveform': () => generateWaveform(this.space, this.form, this.noiseLine, settings.alpha.value, settings.points.value, effect.pointShape),
        'gridCells': () => generateGridCells(this.space, this.form, this.follower, settings.focus.value, settings.columns.value, settings.rows.value, )
      }
      invocationAssociations[type]()
    }

    for(let m=0; m<this.props.effectModules.length; m++){
      // debugger
      if(!this.props.effectModules[m]['params'].bypass){
        associateInvocation(this.props.effectModules[m]['params'])
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
          style={{opacity: 0.95, height: '100vh'}}
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
