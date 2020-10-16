import React, { Component } from 'react'
import { PtsCanvas } from 'react-pts-canvas'
import { Pt, Create, Rectangle, Color, Circle } from 'pts/dist/es5'
import { connect } from "react-redux";

class VisualizationConfigurator extends PtsCanvas {

  constructor(props) {
    super(props);
    this.noiseLine = []
    this.noiseGrid = []
    this.follower = new Pt();
    this.pts = []
  }

  start() {
    let ln = Create.distributeLinear( [new Pt(0, this.space.center.y), new Pt(this.space.width, this.space.center.y)], 30 );
    let gd = Create.gridPts( this.space.innerBound, 20, 20 );
    this.noiseLine = Create.noisePts( ln, 0.1, 0.1 );
    this.noiseGrid = Create.noisePts( gd, 0.05, 0.1, 20, 20 );
    this.pts = Create.gridCells( this.space.innerBound, 15, 15 );
    this.follower = this.space.center;
  }

  animate( time, ftime ) {

    let speed = this.space.pointer.$subtract( this.space.center ).divide( this.space.center ).abs();

    this.follower = this.follower.add( this.space.pointer.$subtract( this.follower ).divide(4) );

    const generateNoiseGrid = (space, form, noiseGrid) => {
      for(let n=0; n<noiseGrid.length; n++){
        noiseGrid[n].step( 0.08*speed.x, 0.08*(1-speed.y) );
        form.fillOnly("#123").point( noiseGrid[n], Math.abs( noiseGrid[n].noise2D() * space.size.x/10 ) );
      }
    }

    const generateWaveform = (space, form, noiseLine) => {
      let nps = noiseLine.map( (p) => {
        p.step( 0.01*(1-speed.x), 0.05*speed.y );
        return p.$add( 0, p.noise2D()*space.center.y );
      });
      nps = nps.concat( [space.size, new Pt( 1, space.size.y )] );
      form.fillOnly("rgba(41, 98, 255, .75)").polygon( nps );
      form.fill("#76ff03").points( nps, 3, "circle");
    }

    const generateCellBlocks = (space, form, pts, follower, focus) => {
      for(let c=0; c<pts.length; c++){
        let mag = follower.$subtract( Rectangle.center( pts[c] ) ).magnitude()
        let scale = Math.min( 1.5, Math.abs( focus - ( 0.7 * mag / space.center.y ) ) );
        let r = Rectangle.fromCenter( Rectangle.center(pts[c]), Rectangle.size(pts[c]).multiply( scale ) );
        form.fill( Color.HSLtoRGB( Color.hsl( scale*210, 1, 3 ) ).hex ).rect( r );
      }
    }

    const associateInvocation = (effect) => {
      const { type, params } = effect
      const invocationAssociations = {
        'noiseGrid': () => generateNoiseGrid(this.space, this.form, this.noiseGrid),
        'waveform': () => generateWaveform(this.space, this.form, this.noiseLine),
        'cellBlocks': () => generateCellBlocks(this.space, this.form, this.pts, this.follower, params.sparkleFocus)
      }
      invocationAssociations[type]()
    }

    for(let m=0; m<this.props.existingEffects.length; m++){
      const fx = this.props.existingEffects[m]
      associateInvocation(fx)
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
          existingEffects={this.props.existingEffects}
          sparkleFocus={this.props.sparkleFocus}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    existingEffects: state.effectBus.existingEffects,
  };
};

export default connect(
  mapStateToProps,
  null
)(Visualizer);
