import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

const CountDownInput = props => {
  const { secsValue, minsValue, inpHandler, toDisable, totalSeconds } = props;

  const toolTipConvert = value => {
    const mins = Math.floor(value / 60);
    const seconds = Math.round(value - mins * 60);
    return `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <div className="countdown__changers">
      <h1>Введите время:</h1>
      <div className="countdown__inputs">
        <div>
          Mins:
          <InputNumber
            disabled={!toDisable}
            min={0}
            max={720}
            value={minsValue}
            onChange={inpHandler('min')}
            className="timer__input"
          />
        </div>
        <div>
          Seconds:
          <InputNumber
            disabled={!toDisable}
            min={0}
            max={59}
            value={secsValue}
            onChange={inpHandler('sec')}
            className="timer__input"
          />
        </div>
      </div>
      <Slider
        disabled={!toDisable}
        value={totalSeconds}
        className="countdown__slider"
        onChange={inpHandler('slider')}
        step={15}
        min={0}
        max={3600}
        tipFormatter={toolTipConvert}
      />
    </div>
  );
};

CountDownInput.defaultProps = {
  toDisable: false,
  secsValue: 0,
  minsValue: 0,
  inpHandler: null,
  totalSeconds: 0,
};

CountDownInput.propTypes = {
  toDisable: PropTypes.bool,
  secsValue: PropTypes.number,
  minsValue: PropTypes.number,
  inpHandler: PropTypes.func,
  totalSeconds: PropTypes.number,
};

export default CountDownInput;
