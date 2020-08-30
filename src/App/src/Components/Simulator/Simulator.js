import React, { Component } from 'react'

import { PtsCanvas } from 'react-pts-canvas'
import { Pt, Create } from 'pts/dist/es5'

class ConfigureSimulation extends PtsCanvas {

  constructor(props) {
    super(props);
    this.noiseLine = []
    this.noiseGrid = []
  }

  start() {
    // Create a line and a grid, and convert them to `Noise` points
    let ln = Create.distributeLinear( [new Pt(0, this.space.center.y), new Pt(this.space.width, this.space.center.y)], 30 );
    let gd = Create.gridPts( this.space.innerBound, 20, 20 );
    this.noiseLine = Create.noisePts( ln, 0.1, 0.1 );
    this.noiseGrid = Create.noisePts( gd, 0.05, 0.1, 20, 20 );
  }

  animate( time, ftime ) {
    // Use pointer position to change speed
    let speed = this.space.pointer.$subtract( this.space.center ).divide( this.space.center ).abs();

    // Generate noise in a grid
    this.noiseGrid.map( (p) => {
      p.step( 0.01*speed.x, 0.01*(1-speed.y) );
      this.form.fillOnly("#123").point( p, Math.abs( p.noise2D() * this.space.size.x/18 ) );
    });

    // Generate noise in a line
    let nps = this.noiseLine.map( (p) => {
      p.step( 0.01*(1-speed.x), 0.05*speed.y );
      return p.$add( 0, p.noise2D()*this.space.center.y );
    });

    // Draw wave
    nps = nps.concat( [this.space.size, new Pt( 0, this.space.size.y )] );
    this.form.fillOnly("rgba(0,140,255,.65)").polygon( nps );
    this.form.fill("#fff").points( nps, 2, "circle");
  }
}

export default class App extends Component {
  render () {
    return (

      <>
        <ConfigureSimulation background="#0c9" name="pts-tester" style={{opacity: 0.95}} />
      </>
    )
  }
}
