import React, { Component } from 'react';
import click1 from './click1.wav';
import click2 from './click2.wav';
import './Metronome.css';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.beatUnits = [...Array(4).keys()].map(n => 2 ** (n + 1)); // powers of 2, up to 16

    this.state = {
      playing: false,
      bpm: 120,
      count: 0,
      beatsPerMeasure: 4,
      beatUnit: 4
    };
  }

  startMetronome = () => {
    clearInterval(this.timer);
    // TODO Obtain better timing by implementing Web Audio scheduler: https://github.com/cwilso/metronome
    this.timer = setInterval(
      this.playClick,
      (((60 / this.state.bpm) * 4) / this.state.beatUnit) * 1000 // quarter note is our baseline
    );
  };

  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      this.startMetronome();
      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  };

  handleBeatsPerMeasureChange = event => {
    const beatsPerMeasure = event.target.value;
    this.setState({ beatsPerMeasure }, this.startMetronome);
  };

  handleBeatUnitChange = event => {
    const beatUnit = event.target.value;
    this.setState({ beatUnit }, this.startMetronome);
  };

  handleStartStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.startMetronome();
      this.setState(
        {
          playing: true,
          count: 0
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {
    const { playing, bpm, beatsPerMeasure, beatUnit } = this.state;

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
              className="form-control-range w-100 m-4"
            />
            <div className="form-group">
              <label htmlFor="beats-per-measure">beats per measure</label>
              <input
                type="number"
                min="1"
                max="15"
                value={beatsPerMeasure}
                className="form-control"
                id="beats-per-measure"
                onChange={this.handleBeatsPerMeasureChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="beat-unit">beat unit</label>
              <select
                type="number"
                min="1"
                max="15"
                value={beatUnit}
                className="form-control"
                id="beat-unit"
                onChange={this.handleBeatUnitChange}
              >
                {this.beatUnits.map((unit, index) => {
                  return <option key={index}>{unit}</option>;
                })}
              </select>
            </div>
          </div>
          <button
            onClick={this.handleStartStop}
            className="btn btn-primary btn-lg"
          >
            {playing ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

export default Metronome;
