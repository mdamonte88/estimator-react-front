import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

const NavBackClose = ({ linkGoBack, linkClose }) => (
  <div className="nav-back-close">
    <div className="go-back">
      { linkGoBack && (
        <Link to={linkGoBack} className="link" >
          &larr;
        </Link>
      )}
    </div>
    <div className="close">
      { linkClose && (
        <Link to={linkClose} className="link" >
          &times;
        </Link>
      )}
    </div>
  </div>
);

NavBackClose.propTypes = {
  linkGoBack: string,
  linkClose: string,
};

export default NavBackClose;
