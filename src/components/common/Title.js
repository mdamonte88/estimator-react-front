import React from 'react';
import { string } from 'prop-types';

const Title = ({ title }) => (
  <div className="title-container">
    <div className="title-text">
      {title}
      <div className="reference-icons">
        <span>Suggested:</span>
        <div className="features-suggested-icon">
          <div className="star" />
        </div>
      </div>
    </div>
  </div>
);

Title.propTypes = {
  title: string.isRequired,
};

export default Title;
