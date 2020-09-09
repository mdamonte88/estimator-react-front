import React from 'react';
import { bool, func, string, object, number, array } from 'prop-types';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import VariationBox from '../variations/variationBox';
import '../../styles/styles.scss';
import LinkDecorated from '../common/LinkDecorated';

const styles = {
  fontSize: '0.6rem',
  textTransform: 'uppercase',
  fontWeight: 400
};

const FeatureModuleRightMenu = ({ loading, moduleId, moduleName,
  moduleVariationsInfo, moduleDescription, selectVariation, toggle,
  removeVariation, selectedVariationsIds, moduleCategories }) =>
  (
    <div className={loading ? 'loader-page' : ''}>
      <div className="close-modal">
        <a onClick={toggle}>&times;</a>
      </div>
      <div className="module-info">
        <h3>{moduleName}</h3>
        <LinkDecorated
          text={moduleCategories[0].name}
          link=""
          active
          styles={styles}
        />
      </div>
      <p className="module-description">{moduleDescription}</p>
      <hr />
      <div>
        <h3 className="role-model-header">Role Model</h3>
        <div>
          <ButtonGroup className="buttons-variations">
            {
              Object.keys(moduleVariationsInfo).map((modVarId) => {
                const {
                  id,
                  image,
                  featureModuleId,
                  userStories
                } = moduleVariationsInfo[modVarId];

                if (featureModuleId == moduleId) {
                  return (
                    <VariationBox
                      key={modVarId}
                      selectVariation={selectVariation(id, userStories)}
                      removeVariation={removeVariation(id, userStories)}
                      image={image}
                      variationId={id}
                      moduleId={moduleId}
                      userStories={userStories}
                      selectedClass={`${selectedVariationsIds.includes(Number(modVarId)) ? 'variation-box-clicked' : ''}`}
                    />
                  );
                }
              })
            }
          </ButtonGroup>
        </div>
        <hr />
      </div>
    </div>
  );

FeatureModuleRightMenu.propTypes = {
  moduleName: string.isRequired,
  moduleVariationsInfo: object,
  loading: bool.isRequired,
  moduleDescription: string.isRequired,
  selectVariation: func.isRequired,
  removeVariation: func.isRequired,
  moduleId: number.isRequired,
  toggle: func,
  selectedVariationsIds: array.isRequired,
  moduleCategories: array.isRequired
};

const mapStateToProps = state => ({
  moduleVariationsInfo: state.getIn(['moduleVariations', 'moduleVariations']).toJS(),
  loading: state.getIn(['moduleVariations', 'loading']),
  selectedVariationsIds: state.getIn(['myApp', 'variations']).toJS()
});

export default connect(mapStateToProps)(FeatureModuleRightMenu);
