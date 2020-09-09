import React from 'react';
import { connect } from 'react-redux';
import { object, func, string } from 'prop-types';
import { Nav, NavLink, Input } from 'reactstrap';
import { setSearchInput } from '../actions/categoriesActions';

const CategorySidebar = ({ className,
  modulesCategories,
  setModuleCategory,
  selectedCategoryId,
  searchInput
}) => (
  <div className={className}>
    <div>
      <Input
        value={searchInput}
        onChange={({ target }) => setSearchInput(target.value)}
        placeholder="Search..."
        className="search-input"
      />
      <span className="close-search-input" onClick={() => setSearchInput('')}> x </span>
    </div>
    <br />
    <Nav vertical>
      <li className="category">
        <NavLink
          className={(selectedCategoryId == 'all' ? 'selected-category' : '')}
          key="all"
          onClick={() => setModuleCategory('all')}
          href="#"
        >
          <div className="icon-category all-categories-icon" >
            <span> All Categories </span>
          </div>
        </NavLink>
      </li>
      {Object.keys(modulesCategories).map((categoryId, id) => {
        const category = modulesCategories[categoryId];
        return (
          <li className="category" key={id}>
            <NavLink
              className={(selectedCategoryId == categoryId ? 'selected-category' : '')}
              key={categoryId}
              onClick={() => setModuleCategory(categoryId)}
              href="#"
            >
              <div className="icon-category">
                <span> {category.name} </span>
              </div>
            </NavLink>
          </li>
        );
      })}
    </Nav>
  </div>
);

CategorySidebar.propTypes = {
  className: string,
  modulesCategories: object.isRequired,
  selectedCategoryId: string,
  setModuleCategory: func.isRequired,
  searchInput: string
};

const mapStateToProps = state => ({
  modulesCategories: state.getIn(['categoriesReducer', 'modulesCategories']).toJS(),
  selectedCategoryId: state.getIn(['categoriesReducer', 'selectedCategoryId']),
  searchInput: state.getIn(['categoriesReducer', 'searchInput'])
});

const mapDispatchToProps = dispatch => ({
  setSearchInput: seachInput => dispatch(setSearchInput(seachInput)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySidebar);
