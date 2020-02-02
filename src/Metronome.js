import React, { Component } from 'react';
import click1 from './click1.wav';
import click2 from './click2.wav';
import './Metronome.css';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);

    this.state = {
      playing: false,
      bpm: 120,
      count: 0,
      // TODO Add controls for changing time signature
      beatsPerMeasure: 4
    };
  }

  handleBpmChange = (event) => {
    const bpm = event.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      // TODO Refactor this statement into a function
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        bpm
      });
    }
    else {
      this.setState({ bpm });
    }
  };

  handleStartStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    }
    else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
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
    }
    else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
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
          <button
            onClick={this.handleStartStop}
            className="btn btn-primary btn-lg">
            {playing ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

export default Metronome;
