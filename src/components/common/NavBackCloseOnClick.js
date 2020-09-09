import React from 'react';
import { func } from 'prop-types';
import '../../styles/styles.scss';

const NavBackCloseOnClick = ({ linkGoBack, linkClose }) => (
  <nav className="nav-back-close">
    <div className="go-back">
      <div onClick={linkGoBack} className="link" >
        &larr;
      </div>
    </div>
    <div className="close">
      <div onClick={linkClose} className="link" >
        &times;
      </div>
    </div>
  </nav>
);

NavBackCloseOnClick.propTypes = {
  linkGoBack: func.isRequired,
  linkClose: func.isRequired
};

export default NavBackCloseOnClick;
