import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, string, func, array } from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import LabelDecoration from '../../../src/icons/LabelDecoration';
import defaultModalImage from '../../images/iphone.png';

class FeatureModuleItem extends Component {
  constructor() {
    super();
    this.state = {
      isHovering: false,
      isRemoved: false
    };
    this.handleRemovedModule = this.handleRemovedModule.bind(this);
  }

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
    });
  };

  handleMouseEnter = () => {
    this.setState({
      isHovering: true,
    });
  };

  handleRemovedModule() {
    this.setState({ isRemoved: !this.state.isRemoved });
  }

  openModalInComponent = () => {
    const { openModal } = this.props;
    const { isRemoved } = this.state;
    if (!isRemoved) {
      openModal();
    }
  };

  render() {
    const {
      name,
      categories,
      onRemoveFromAppClicked,
      image,
      isSuggested
    } = this.props;
    const style = { background: `url(${image}) no-repeat`, backgroundSize: '100% 98%' };
    return (
      <div
        onFocus={this.handleMouseEnter}
        onMouseOver={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="app-card"
      >
        {isSuggested && <div className="features-suggested-icon"> <div className="star" /> </div>}
        <div className="app-module-container" onClick={this.openModalInComponent} style={style}>
          <img src={defaultModalImage} className="app-module-image" alt="Rootstrap Module" />
          { this.state.isHovering &&
            <div className="trash-button-container">
              <div
                onMouseEnter={this.handleRemovedModule}
                onMouseLeave={this.handleRemovedModule}
                onClick={onRemoveFromAppClicked}
                className="trash-button"
              />
            </div>
          }
        </div>
        <Container>
          <Row>
            <Col
              xs={8}
              className="app-module-name"
            >
              {name}
            </Col>
            <Col
              xs={4}
              className="app-module-category"
            >
              { categories.length > 0 ? categories[0].name.toUpperCase() : 'Uncategorized'}
              <div className="decoration" >
                <LabelDecoration />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

FeatureModuleItem.propTypes = {
  name: string.isRequired,
  categories: array.isRequired,
  onRemoveFromAppClicked: func.isRequired,
  openModal: func,
  isSuggested: bool.isRequired,
  image: string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  isSuggested: state.getIn(['module', 'suggestedModules']).toJS().findIndex(obj => obj.id === ownProps.id) > -1
});

export default connect(mapStateToProps)(FeatureModuleItem);
