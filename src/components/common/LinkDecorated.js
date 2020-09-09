import React from 'react';
import { Link } from 'react-router-dom';
import { string, bool, func, object } from 'prop-types';
import LabelDecoration from '../../icons/LabelDecoration';

const LinkDecorated = ({ text, link, active, width, onClick, styles }) => (
  <Link style={styles} onClick={onClick} to={link} className={`link-decorated ${active ? 'active' : ''}`} >
    <div className="label" style={{ width }} >
      {text}
    </div>
    <div className="decoration" >
      <LabelDecoration />
    </div>
  </Link>
);

LinkDecorated.propTypes = {
  text: string.isRequired,
  link: string.isRequired,
  active: bool,
  width: string,
  onClick: func,
  styles: object
};

export default LinkDecorated;
