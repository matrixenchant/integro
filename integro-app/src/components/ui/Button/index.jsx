import { animated, useSpring } from '@react-spring/web';
import React, { useRef } from 'react';

import { $class } from '../../../utils';
import Icon from '../Icon';
import './index.scss';

const Button = ({
  className,
  loading = false,
  fullWidth = false,
  type = 'main',
  onClick,
  label,
  icon,
  disabled,
  iconAlign = 'start',
  style,
  children
}) => {
  const rippleRef = useRef(null);
  const buttonRef = useRef(null);

  const [{ scale, opacity }, springApi] = useSpring(() => ({
    scale: 0,
    opacity: 0,
  }));

  const IconComponent = (
    <div className="ui-button-icon">
      <Icon slug={icon} />
    </div>
  );

  return (
    <animated.button
      ref={buttonRef}
      disabled={loading || disabled}
      onMouseDown={(e) => {
        if (!buttonRef.current) return;

        springApi.set({
          scale: 0,
          opacity: 0.5,
        });

        springApi.start({
          scale: 5,
          opacity: 0,
          config: { duration: 400 },
        });

        const { x, y } = buttonRef.current.getBoundingClientRect();

        rippleRef.current.style.top = `${e.clientY - y}px`;
        rippleRef.current.style.left = `${e.clientX - x}px`;
      }}
      onClick={(e) => {
        if (loading) return;

        if (onClick) onClick(e);
      }}
      className={$class(
        'ui-button',
        `ui-button--type-${type}`,
        ['ui-button--loading', loading],
        className
      )}
      style={{
        ...(fullWidth ? { width: '100%' } : {}),
        ...style,
      }}>
      <div className="ui-button-wrap">
        <animated.div
          ref={rippleRef}
          style={{ transform: scale.to((v) => `scale(${v}) translate(-50%,-50%)`), opacity }}
          className="ui-button-ripple"></animated.div>
        <div className="ui-button-body">
          {icon && iconAlign === 'start' && IconComponent}
          {(label || children) && (
            <span
              style={{
                margin: `0 ${icon && iconAlign === 'end' ? 'var(--ui-btn-icon-gap)' : 0} 0 ${
                  icon && iconAlign === 'start' ? 'var(--ui-btn-icon-gap)' : 0
                }`,
              }}>
              {label || children}
            </span>
          )}
          {icon && iconAlign === 'end' && IconComponent}
        </div>
        <div className="ui-button-loading">
          <span></span>
        </div>
      </div>
    </animated.button>
  );
};

export default Button;
