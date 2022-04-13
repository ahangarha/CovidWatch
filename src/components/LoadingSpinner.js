import React from 'react';
import { PropTypes } from 'prop-types';

const LoadingSpinner = ({ size = '' }) => {
  const sizeClasses = size.length ? size : 'w-6 h-6';
  console.log(size);
  return (
    <div className={`inline-block ${sizeClasses} border-white border-2 border-t-white/0 border-r-white/25 border-b-white/60 rounded-full animate-spin`} />
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  size: '',
};

export default LoadingSpinner;
