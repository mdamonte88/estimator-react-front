import React, { Component } from 'react';
import { func, string, shape, bool } from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle
} from 'reactstrap';

class FeatureModuleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    const { module,
      onAddToSelectedClicked,
      onRemoveFromSelectedClicked,
      added,
      isSuggested
    } = this.props;
    const { isHovering } = this.state;

    const { name, image, hoverImage } = module;
    return (
      <Card
        onClick={added ? onRemoveFromSelectedClicked : onAddToSelectedClicked}
        className={added ? 'selected' : ''}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {isSuggested && <div className="features-suggested-icon"> <div className="star" /> </div>}
        <CardImg
          top
          width="100%"
          src={added || isHovering ? hoverImage : image}
          alt="Module Image"
        />
        <CardBody>
          <CardTitle>{name}</CardTitle>
        </CardBody>
      </Card>
    );
  }
}

FeatureModuleCard.propTypes = {
  module: shape({
    name: string.isRequired,
    image: string,
    hoverImage: string }).isRequired,
  onAddToSelectedClicked: func.isRequired,
  onRemoveFromSelectedClicked: func.isRequired,
  added: bool.isRequired,
  isSuggested: bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  added: state.getIn(['myApp', 'toAddIds']).findIndex(obj => obj === ownProps.module.id) > -1,
  isSuggested: state.getIn(['module', 'suggestedModules']).toJS().findIndex(obj => obj.id === ownProps.module.id) > -1
});

export default connect(mapStateToProps)(FeatureModuleCard);
