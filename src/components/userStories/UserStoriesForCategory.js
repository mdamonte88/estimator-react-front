import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LabelDecoration from '../../icons/LabelDecoration';

const UserStoriesForCategory = ({ userStories,
  addedUserStories,
  categoryName,
  modules,
  decorationColor,
  moduleVariations,
  addedVariationsIds
}) => {
  const totalPriceForModule = (moduleId) => {
    let totalPrice = 0;

    addedUserStories.forEach((userStoryId) => {
      const { featureModuleId, price, variationId } = userStories[userStoryId];

      if (featureModuleId === moduleId && variationId.length === 0) {
        totalPrice += price;
      }
    });

    return totalPrice;
  };

  const totalPriceForVariation = (varId) => {
    let totalPrice = 0;
    Object.keys(userStories).map((userStoryId) => {
      const { variationId, price } = userStories[userStoryId];

      if (variationId.includes(varId)) {
        totalPrice += price;
      }
    });

    return totalPrice;
  };

  return (
    <div className="user-stories-for-category" >
      <div className="mb-4">
        <div className="category" >
          {categoryName} Features
        </div>
        <div className="decoration" style={{ color: decorationColor }} >
          <LabelDecoration width="70" weight="2" />
        </div>
      </div>
      { modules.map(({ id, name }) => (
        <div key={id} >
          <div className="user-stories">
            <div className="user-stories-header" >
              <div>
                {name}
              </div>
              <div>
                <span className="price-symbol">$ </span>
                {totalPriceForModule(id)}
              </div>
            </div>
            { addedUserStories.map((userStoryId) => {
              const userStory = userStories[userStoryId];

              if (userStory.featureModuleId === id &&
                userStory.variationId.length === 0) {
                return (
                  <div key={userStory.id} className="user-story-content">
                    <div className="name">
                      {userStory.name}
                    </div>
                    <div className="description">
                      {userStory.description}
                    </div>
                    <div className="price">
                      <span className="price-symbol">$ </span>
                      {userStory.price}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          { addedVariationsIds.map((addedVariationId) => {
            const { name = '', image = '', featureModuleId } = moduleVariations[addedVariationId];

            if (featureModuleId == id) {
              return (
                <div key={addedVariationId} className="user-stories">
                  <div className="user-stories-header" >
                    <div className="flex align-items-center">
                      <div className="mr-3">
                        {name} (Role Model)
                      </div>
                      <img
                        src={image}
                        alt={name}
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                    <div>
                      <span className="price-symbol">$ </span>
                      {totalPriceForVariation(addedVariationId)}
                    </div>
                  </div>
                  {Object.keys(userStories).map((userStoryId) => {
                    if (userStories[userStoryId].variationId
                      .includes(addedVariationId)) {
                      const {
                        id,
                        name,
                        description,
                        price
                      } = userStories[userStoryId];
                      return (
                        <div key={id} className="user-story-content">
                          <div className="name">
                            {name}
                          </div>
                          <div className="description">
                            {description}
                          </div>
                          <div className="price">
                            <span className="price-symbol">$ </span>
                            {price}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

UserStoriesForCategory.propTypes = {
  userStories: PropTypes.object.isRequired,
  addedUserStories: PropTypes.array.isRequired,
  categoryName: PropTypes.string.isRequired,
  modules: PropTypes.array.isRequired,
  decorationColor: PropTypes.string.isRequired,
  moduleVariations: PropTypes.object.isRequired,
  addedVariationsIds: PropTypes.array.isRequired,
};

const mapState = state => ({
  userStories: state.getIn(['userStories', 'userStories']).toJS(),
  addedUserStories: state.getIn(['myApp', 'userStories']).toJS(),
  moduleVariations: state.getIn(['moduleVariations', 'moduleVariations']).toJS(),
  addedVariationsIds: state.getIn(['myApp', 'variations']).toJS(),
});

export default connect(mapState)(UserStoriesForCategory);
