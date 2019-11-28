import React from 'react';
import { Icon, Progress } from 'antd';
import CountDownInput from './CountDownInput';
import finishedSound from '../audio/finished.mp3';

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minsValue: '00',
      secsValue: '00',
      playBtnIsActive: false,
      percentTimeOff: 0,
      step: 0,
      isFirstPlay: true,
    };
  }

  componentWillUnmount() {
    this.clean();
  }

  convertToTime = time => {
    return Number(time) < 10 ? `0${time}` : `${time}`;
  };

  inputHandler = type => value => {
    const newValue = this.convertToTime(value);
    if (type === 'slider') {
      this.setState({ minsValue: newValue });
      return;
    }
    const key = type === 'min' ? 'minsValue' : 'secsValue';
    this.setState({ [key]: newValue });
  };

  startCountdown = () => {
    const { playBtnIsActive, isFirstPlay, minsValue, secsValue } = this.state;
    if (minsValue === '00' && secsValue === '00') {
      alert('Введите время');
      return;
    }
    this.setState({ playBtnIsActive: !playBtnIsActive });
    if (playBtnIsActive) {
      clearInterval(this.timerId);
      return;
    }
    if (isFirstPlay) {
      this.setState(
        {
          step: 100 / (Number(secsValue) + Number(minsValue) * 60),
          isFirstPlay: false,
        },
        () => {
          this.startTimer();
        }
      );
    }
  };

  startTimer = () => {
    this.timerId = setInterval(() => {
      const { step, minsValue, secsValue } = this.state;
      let newMin = Number(minsValue);
      let newSec = Number(secsValue);
      if (newMin === 0 && newSec === 0) {
        const finished = new Audio(finishedSound);
        finished.play();
        this.clean();
        return;
      }
      if (newSec === 0) {
        newSec = 59;
        newMin -= 1;
      } else {
        newSec -= 1;
      }
      this.setState(state => {
        return {
          minsValue: this.convertToTime(newMin),
          secsValue: this.convertToTime(newSec),
          percentTimeOff: Number((state.percentTimeOff + Number(step)).toFixed(2)),
        };
      });
    }, 1000);
  };

  clean = () => {
    this.setState({
      playBtnIsActive: false,
      minsValue: '00',
      secsValue: '00',
      isFirstPlay: true,
      percentTimeOff: 0,
    });
    clearInterval(this.timerId);
  };

  render() {
    const { minsValue, playBtnIsActive, secsValue, percentTimeOff, isFirstPlay } = this.state;
    const play = playBtnIsActive ? 'pause-circle' : 'play-circle';
    return (
      <div className="countdown timer">
        <span className="timer__count">
          {minsValue}:{secsValue}
        </span>
        <Progress type="circle" percent={percentTimeOff} />
        <CountDownInput
          minsValue={minsValue}
          secsValue={secsValue}
          toDisable={isFirstPlay}
          inpHandler={this.inputHandler}
        />
        <div className="countdown__btns">
          <button type="button" className="timer__btn" onClick={this.startCountdown}>
            <Icon type={play} theme="twoTone" />
          </button>
          <button type="button" className="timer__btn" onClick={this.clean}>
            <Icon type="close-square" theme="twoTone" />
          </button>
        </div>
      </div>
    );
  }
}

export default CountDown;
