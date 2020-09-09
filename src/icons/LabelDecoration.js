import React from 'react';
import { string } from 'prop-types';

const LabelDecoration = ({ width = '32', height = '11', weight = '1.3' }) => {
  const svgId = Math.floor(Math.random() * 1000000);

  return (
    <svg width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`} version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="50%" y1="6.3406808%" x2="47.311678%" y2="100%" id={svgId} >
          <stop stopColor="#91FF7D" stopOpacity="0" offset="0%" />
          <stop stopColor="currentColor" stopOpacity="0.442114718" offset="39.7527135%" />
          <stop stopColor="currentColor" offset="100%" />
        </linearGradient>
      </defs>
      <g id="📱-UI" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="04a---Screens-Black" transform="translate(-689.000000, -30.000000)" stroke={`url(#${svgId})`} strokeWidth={weight}>
          <g id="Group-3" transform="translate(56.000000, 10.000000)">
            <g id="Group-9" transform="translate(553.000000, 9.000000)">
              <g id="Group-6" transform="translate(80.000000, 0.000000)">
                <rect id="Rectangle" x="0.65" y="11.65" width={width - 1.3} height={height - 1.3} />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

LabelDecoration.propTypes = {
  width: string,
  height: string,
  weight: string,
};

export default LabelDecoration;
