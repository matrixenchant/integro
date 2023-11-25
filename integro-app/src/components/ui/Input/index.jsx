import React from 'react';

import { $class } from '../../../utils';
import './index.scss';

const Input = ({ value = '', onChange, label, name, placeholder, type = 'text', style, index = 0 }) => {
  const onChangeHandler = (e) => {
    if (onChange) onChange(e);
  };

  return (
    <div className={$class('ui-input')} style={style}>
      <div className="ui-input-body">
        <label className="ui-input-label" htmlFor={`input-${name}-${index}`}>
          {label}
        </label>
        <input
          required
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
          type={type}
          id={`input-${name}-${index}`}
          name={name}
        />
      </div>
    </div>
  );
};

export default Input;
