import { useState } from 'react';
import Star from './Star';
import PropTypes from 'prop-types';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};
const starContainerStyle = {
  display: 'flex',
};

StarRating.propTypes = {
  onSetRate: PropTypes.func,
};

function StarRating({
  maxRate,
  color = '#fcc419',
  size = 48,
  message = [],
  defaultRating = 0,
  onSetRate,
}) {
  const [rate, setRate] = useState(defaultRating);
  const [tempRate, setTempRate] = useState(0);

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    size: `${size / 1.5}px`,
  };

  function handleRate(i) {
    setRate(i + 1);
    if (typeof onSetRate === 'function') onSetRate(i + 1);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRate }, (_, i) => (
          <Star
            key={i}
            fullStar={tempRate ? tempRate >= i + 1 : rate >= i + 1}
            onSetRate={() => handleRate(i)}
            onMouseEnter={() => setTempRate(i + 1)}
            onMouseLeave={() => setTempRate(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxRate
          ? message[tempRate ? tempRate - 1 : rate - 1]
          : tempRate || rate || ''}
      </p>
    </div>
  );
}

export default StarRating;
