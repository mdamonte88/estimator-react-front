import React, { Component } from 'react';
import { string, number, func, array } from 'prop-types';

class VariationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.showSelected = this.showSelected.bind(this);
  }

  showSelected(variationId) {
    const { selected } = this.state;
    const { selectVariation, removeVariation, userStories } = this.props;
    if (selected) {
      removeVariation(variationId, userStories);
    } else {
      selectVariation(variationId, userStories);
    }
    this.setState({ selected: !selected });
  }

  render() {
    const { image, variationId, selectedClass, userStories } = this.props;
    return (
      <div className={`variation-box ${selectedClass}`} onClick={() => this.showSelected(variationId, userStories)}>
        <img width="25px" height="25px" src={image || 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'} alt="Variation" />
      </div>
    );
  }
}

VariationBox.propTypes = {
  image: string.isRequired,
  variationId: number,
  userStories: array,
  selectVariation: func.isRequired,
  removeVariation: func.isRequired,
  selectedClass: string.isRequired
};

export default VariationBox;
