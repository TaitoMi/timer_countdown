import React from 'react';
import { Icon, Progress } from 'antd';
import CountDownInput from './CountDownInput';
import finishedSound from '../audio/finished.mp3';

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minsValue: 0,
      secsValue: 0,
      playBtnIsActive: false,
      percentTimeOff: 0,
      step: 0,
      isFirstPlay: true,
      totalSeconds: 0,
    };
  }

  componentWillUnmount() {
    this.clean();
  }

  inputHandler = type => value => {
    const newValue = value;
    if (type === 'slider') {
      const mins = Math.floor(value / 60);
      const seconds = value - mins * 60;
      this.setState({
        minsValue: mins,
        secsValue: seconds,
        totalSeconds: value,
      });
      return;
    }
    const key = type === 'min' ? 'minsValue' : 'secsValue';
    this.setState({ [key]: newValue });
  };

  startCountdown = () => {
    const { playBtnIsActive, isFirstPlay, minsValue, secsValue } = this.state;
    if (minsValue === 0 && secsValue === 0) {
      alert('Введите время');
      return;
    }
    this.setState({ playBtnIsActive: !playBtnIsActive });
    if (playBtnIsActive) {
      clearInterval(this.timerId);
      return;
    }
    if (isFirstPlay || !playBtnIsActive) {
      this.setState(
        {
          step: 100 / (minsValue * 60 + secsValue),
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
      let newMin = minsValue;
      let newSec = secsValue;
      if (newMin === 0 && newSec === 0) {
        const finished = new Audio(finishedSound);
        finished.volume = 0.3;
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
          minsValue: newMin,
          secsValue: newSec,
          percentTimeOff: Number((state.percentTimeOff + Number(step)).toFixed(2)),
        };
      });
    }, 1000);
  };

  clean = () => {
    this.setState({
      playBtnIsActive: false,
      minsValue: 0,
      secsValue: 0,
      isFirstPlay: true,
      percentTimeOff: 0,
      totalSeconds: 0,
    });
    clearInterval(this.timerId);
  };

  render() {
    const {
      minsValue,
      playBtnIsActive,
      secsValue,
      percentTimeOff,
      isFirstPlay,
      totalSeconds,
    } = this.state;
    const play = playBtnIsActive ? 'pause-circle' : 'play-circle';
    const time = `${minsValue.toString().padStart(2, '0')}:${secsValue
      .toString()
      .padStart(2, '0')}`;
    return (
      <div className="countdown timer">
        <Progress type="circle" percent={percentTimeOff} format={() => time} />
        <CountDownInput
          minsValue={minsValue}
          secsValue={secsValue}
          toDisable={isFirstPlay}
          totalSeconds={totalSeconds}
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
