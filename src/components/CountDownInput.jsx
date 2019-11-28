import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

const CountDownInput = props => {
  const { secsValue, minsValue, inpHandler, toDisable } = props;
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
          />
        </div>
      </div>
      <Slider
        disabled={!toDisable}
        value={Number(minsValue)}
        className="countdown__slider"
        onChange={inpHandler('slider')}
        step={15}
        min={0}
        max={60}
      />
    </div>
  );
};

CountDownInput.defaultProps = {
  toDisable: false,
  secsValue: '00',
  minsValue: '00',
  inpHandler: null,
};

CountDownInput.propTypes = {
  toDisable: PropTypes.bool,
  secsValue: PropTypes.string,
  minsValue: PropTypes.string,
  inpHandler: PropTypes.func,
};

export default CountDownInput;
