import React from 'react';
import { string } from 'prop-types';

const InputDecoration = ({ width = '202px', height = '31px' }) => (
  <svg width={width} height={height} viewBox="0 0 202 31" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="50%" y1="6.3406808%" x2="50%" y2="89.9135045%" id="linearGradient-1">
        <stop stopColor="#05F9C7" stopOpacity="0" offset="0%" />
        <stop stopColor="#02F195" offset="100%" />
      </linearGradient>
    </defs>
    <g id="📱-UI" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="03b---Name-Filled" transform="translate(-594.000000, -284.000000)" stroke="url(#linearGradient-1)" strokeWidth="2">
        <g id="Group-3" transform="translate(594.000000, 215.000000)">
          <rect id="Rectangle" x="0" y="88" width="200" height="11" />
        </g>
      </g>
    </g>
  </svg>
);

InputDecoration.propTypes = {
  width: string,
  height: string,
};

export default InputDecoration;
