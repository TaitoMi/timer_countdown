import React from 'react';
import { Icon } from 'antd';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playBtnIsActive: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
    };
  }

  componentWillUnmount() {
    this.clean();
  }

  startTimer = event => {
    event.preventDefault();
    const { playBtnIsActive } = this.state;
    if (playBtnIsActive) {
      this.setState({ playBtnIsActive: !playBtnIsActive });
      cancelAnimationFrame(this.timerId);
      return;
    }
    this.setState({ playBtnIsActive: !playBtnIsActive });
    this.timerId = requestAnimationFrame(this.timer(Date.now()));
  };

  timer = prevTime => () => {
    const currTime = Date.now();
    const { miliseconds, seconds, minutes } = this.state;
    let newMs = Number(miliseconds) + (currTime - prevTime);
    let newSec = Number(seconds);
    let newMins = Number(minutes);
    if (newMs > 999) {
      newMs = 0;
      newSec += 1;
      if (newSec === 60) {
        newSec = 0;
        newMins += 1;
      }
    }
    this.setState(
      {
        miliseconds: newMs,
        seconds: newSec,
        minutes: newMins,
      },
      () => {
        this.timerId = requestAnimationFrame(this.timer(currTime));
      }
    );
  };

  // convertToTimeFormat = time => {
  //   return time < 10 ? `0${time}` : `${time}`;
  // };

  // msConvert = ms => {
  //   if (ms > 9 && ms < 100) {
  //     return `0${ms}`;
  //   }
  //   return `${ms}`;
  // };

  clean = () => {
    this.setState({
      playBtnIsActive: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
    });
    cancelAnimationFrame(this.timerId);
  };

  stopTimer = event => {
    event.preventDefault();
    this.clean();
  };

  render() {
    const { minutes, seconds, miliseconds, playBtnIsActive } = this.state;
    const play = playBtnIsActive ? 'pause-circle' : 'play-circle';
    return (
      <div className="app__timer timer">
        <span className="timer__count">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}:
          {miliseconds.toString().padStart(3, '0')}
        </span>
        <div className="timer__btns">
          <button type="button" className="timer__btn" onClick={this.startTimer}>
            <Icon type={play} theme="twoTone" />
          </button>
          <button type="button" className="timer__btn" onClick={this.stopTimer}>
            <Icon type="close-square" theme="twoTone" />
          </button>
        </div>
      </div>
    );
  }
}
export default Timer;
