import React, { Component } from 'react'
import { PtsCanvas } from 'react-pts-canvas'
import { Pt, Create, Rectangle, Color } from 'pts/dist/es5'
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
    // Create a line and a grid, and convert them to `Noise` points
    let ln = Create.distributeLinear( [new Pt(0, this.space.center.y), new Pt(this.space.width, this.space.center.y)], 30 );
    let gd = Create.gridPts( this.space.innerBound, 20, 20 );
    this.noiseLine = Create.noisePts( ln, 0.1, 0.1 );
    this.noiseGrid = Create.noisePts( gd, 0.05, 0.1, 20, 20 );
    this.pts = Create.gridCells( this.space.innerBound, 40, 20 );
    this.follower = this.space.center;
  }

  animate( time, ftime ) {
    // Use pointer position to change speed
    let speed = this.space.pointer.$subtract( this.space.center ).divide( this.space.center ).abs();

    // Generate noise in a grid
    this.noiseGrid.map( (p) => {
      p.step( 0.08*speed.x, 0.08*(1-speed.y) );
      this.form.fillOnly("#123").point( p, Math.abs( p.noise2D() * this.space.size.x/10 ) );
    });

    this.follower = this.follower.add( this.space.pointer.$subtract( this.follower ).divide(4) );

    this.form.stroke("#fff");

    // Generate noise in a line
    let nps = this.noiseLine.map( (p) => {
      p.step( 0.01*(1-speed.x), 0.05*speed.y );
      return p.$add( 0, p.noise2D()*this.space.center.y );
    });

    // Draw wave
    nps = nps.concat( [this.space.size, new Pt( 1, this.space.size.y )] );
    this.form.fillOnly("rgba(41, 98, 255, .75)").polygon( nps );
    this.form.fill("#76ff03").points( nps, 3, "circle");

    // calculate the size and color of each cell based on its distance to the pointer
    let rects = this.pts.map( (p) => {
      let mag = this.follower.$subtract( Rectangle.center( p ) ).magnitude()
      let scale = Math.min( 1.5, Math.abs( this.props.sparkleFocus - ( 0.7 * mag / this.space.center.y ) ) );
      let r = Rectangle.fromCenter( Rectangle.center(p), Rectangle.size(p).multiply( scale ) );
      this.form.fill( Color.HSLtoRGB( Color.hsl( scale*210, 1, 3 ) ).hex ).rect( r );
    })

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
          sparkleFocus={this.props.sparkleFocus}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sparkleFocus: state.effectBus.sparkleFocus,
  };
};

export default connect(
  mapStateToProps,
  null
)(Visualizer);
