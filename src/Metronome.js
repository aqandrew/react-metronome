import React, { Component } from 'react';
import './Metronome.css';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      bpm: 120,
      count: 0,
      beatsPerMeasure: 4
    };
  }

  handleBpmChange = (event) => {
    const bpm = event.target.value;
    this.setState({ bpm });
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="container">
        <h1>Metronome</h1>
        {/* TODO Move .container and h1 to App.js */}
        <div className="metronome">
          <div className="bpm-slider">
            <h2>{bpm} BPM</h2>
            <input
              type="range"
              min="60"
              max="240"
              value={bpm}
              onChange={this.handleBpmChange}
              className="form-control-range w-100 m-4" />
          </div>
          <button className="btn btn-primary btn-lg">
            {playing ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

export default Metronome;
