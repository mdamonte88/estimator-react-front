import React from 'react';
import { number } from 'prop-types';

const ProgressBar = ({ progress }) => (
  <div>
    <div style={{ width: `${progress.toString()}%` }} className="progress" />
  </div>
);

ProgressBar.propTypes = {
  progress: number.isRequired,
};

export default ProgressBar;
