import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, string, func, number, bool, object } from 'prop-types';
import { Col, Row, Container } from 'reactstrap';
import CommentForm from '../common/CommentForm';
import { addCommentToModule } from '../../actions/moduleActions';
import { COMMENT_FORM_NAME } from '../../constants/constants';
import FeatureModuleRightMenu from './FeatureModuleRightMenu';
import LinkDecorated from '../common/LinkDecorated';
import UserStoriesForCategory from '../userStories/UserStoriesForCategory';
import defaultModalImage from '../../icons/defaultModalImage.svg';

const styles = {
  marginRight: '1rem',
};

class FeatureModuleDetails extends Component {
  state = {
    selected: 'screen'
  };

  handleClick = (viewBacklog, state) => {
    viewBacklog();
    this.setState({
      selected: state
    });
  }

  render() {
    const { selected } = this.state;
    const { moduleUnique } = this.props;
    const {
      module: {
        id,
        name,
        description,
        moduleCategories,
        moduleVariations = []
      },
      viewBacklog,
      viewDetails,
      selectVariation,
      toggle,
      userStoriesForModuleVariationsId,
      removeVariation } = this.props;
    let modalImage = defaultModalImage;
    moduleVariations.length && (modalImage = moduleVariations[0].image.url);
    return (
      <Container>
        <Row>
          <Col xs="8" className="screen">
            <div className="toggle-backlog">
              <LinkDecorated
                text="Screen"
                link="#"
                onClick={() => this.handleClick(viewBacklog, 'screen')}
                styles={styles}
                active={selected == 'screen'}
              />
              <LinkDecorated
                text="Backlog"
                link="#"
                onClick={() => this.handleClick(viewBacklog, 'backlog')}
                active={selected == 'backlog'}
              />
            </div>
            <div className={`backlogDetailsContent ${viewDetails ? 'hidden' : 'show'}`}>
              <div className="modal-user-stories" >
                <UserStoriesForCategory
                  key="0"
                  categoryName={moduleCategories[0].name}
                  modules={[moduleUnique]}
                  decorationColor="red"
                  userStoriesForModuleVariationsId={userStoriesForModuleVariationsId}
                />
              </div>
            </div>
            <div className={`${viewDetails ? 'show' : 'hidden'}`}>
              <figure className="modal-image-container">
                <img
                  className="modal-image"
                  height="350px"
                  src={modalImage}
                  alt="Module"
                />
              </figure>
            </div>
          </Col>
          <Col xs="4" className="module-details">
            <FeatureModuleRightMenu
              moduleId={id}
              moduleName={name}
              moduleDescription={description}
              selectVariation={selectVariation}
              moduleCategories={moduleCategories}
              toggle={toggle}
              removeVariation={removeVariation}
            />
            <CommentForm
              key={id}
              onSubmit={addCommentToModule}
              form={`${COMMENT_FORM_NAME}${id}`}
              initialValues={{ moduleId: id }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

FeatureModuleDetails.propTypes = {
  module: shape({
    id: number.isRequired,
    name: string.isRequired,
    description: string.isRequired,
    image: string }).isRequired,
  viewBacklog: func,
  viewDetails: bool,
  selectVariation: func,
  removeVariation: func,
  toggle: func,
  moduleUnique: object,
  userStoriesForModuleVariationsId: object
};

const mapState = state => ({
  userStoriesForModuleVariationsId: state.getIn(['moduleVariations', 'userStoriesForModuleVariationsId']).toJS(),
  loadingUser: state.getIn(['moduleVariations', 'loadingUser'])
});

export default connect(mapState, null)(FeatureModuleDetails);
