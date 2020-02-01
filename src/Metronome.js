import React, { Component } from 'react';
import './Metronome.css';

class Metronome extends Component {
  render() {
    let bpm = 140;
    let playing = false;

    return (
      <div className="container">
        <h1>Metronome</h1>
        <div className="metronome">
          <div className="bpm-slider">
            <h2>{bpm} BPM</h2>
            <input type="range" min="60" max="240" value={bpm} className="form-control-range w-100 m-4" />
          </div>
          <button className="btn btn-primary btn-lg">{playing ? 'Stop' : 'Start'}</button>
        </div>
      </div>
    );
  }
}

export default Metronome;
