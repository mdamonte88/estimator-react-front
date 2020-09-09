import React from 'react';
import { Table, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ModuleVariationsTable = ({
  moduleName,
  loadingUser,
  userStoriesForModuleVariationsId
}) => {
  let totalPoints = 0;
  let totalPrice = 0;
  if (!loadingUser) {
    return (
      <div className={`${loadingUser ? 'loader-page' : ''}`}>
        <Table hover>
          <thead>
            <tr>
              <th>{moduleName}</th>
              <th>Name</th>
              <th>User Story Points</th>
              <th>User Story Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(userStoriesForModuleVariationsId)
              .map((UserStoriesId) => {
                const user = userStoriesForModuleVariationsId[UserStoriesId];
                totalPoints += user.points;
                totalPrice += user.price;
                return (
                  <tr key={user.id} >
                    <th scope="row">{user.id + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.points}</td>
                    <td>{user.price}</td>
                  </tr>);
              })
            }
          </tbody>
        </Table>
        <Alert color="primary" align="center">
        Total Price: {totalPrice} | Total Points: {totalPoints}
        </Alert>
      </div>
    );
  }
  return null;
};

ModuleVariationsTable.propTypes = {
  moduleName: PropTypes.string,
  userStoriesForModuleVariationsId: PropTypes.object,
  loadingUser: PropTypes.bool
};

const mapState = state => ({
  userStoriesForModuleVariationsId: state.getIn(['moduleVariations', 'userStoriesForModuleVariationsId']).toJS(),
  loadingUser: state.getIn(['moduleVariations', 'loadingUser']),
});

export default connect(mapState)(ModuleVariationsTable);
