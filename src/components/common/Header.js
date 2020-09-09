import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { array, object, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col }
  from 'reactstrap';
import routes from '../../constants/routesPaths';
import Logo from '../../icons/Logo';
import LinkDecorated from './LinkDecorated';
import Arrow from '../../icons/Arrow';
import { addSuggestedFeatures } from '../../actions/appActions';
import { login, logout } from '../../actions/sessionActions';
import LoginForm from '../user/LoginForm';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      logout: false
    };

    this.toggle = this.toggle.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggle() {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
      logout: true
    });
  }

  logout() {
    const { logout } = this.props;
    logout();
    this.setState({
      modal: false,
      logout: false
    });
  }

  calculatePrice(userStoriesSelected) {
    const { userStories } = this.props;
    const showUserStories = userStories.toJS();
    let price = 0;
    userStoriesSelected.forEach((userStoryId) => {
      price += userStoryId.price || showUserStories[userStoryId].price;
    });

    return price;
  }

  render() {
    const {
      menuActive,
      userStoriesSelected,
      authenticated,
      user,
      login,
      questions,
      allAnswersSelected
    } = this.props;
    const showUser = user.toJS();
    return (
      <div className="container-header">
        <Row className="general-row" >
          <Col className="flex justify-content-center justify-content-lg-start align-items-center mb-3 mb-lg-0" xs={12} lg={4} >
            <Link to={routes.myApp}>
              <Logo />
            </Link>
          </Col>
          <Col className="flex justify-content-center justify-content-lg-center align-items-center mb-3 mb-lg-0" xs={12} lg={4} >
            <Row>
              <Col xs={4} className="items-middle" >
                <LinkDecorated
                  text="Setup"
                  link={routes.setup}
                  active={menuActive.setup}
                />
              </Col>
              <Col xs={4} className="items-middle" >
                <LinkDecorated
                  text="Screens"
                  link={routes.myApp}
                  active={menuActive.screens}
                />
              </Col>
              <Col xs={4} className="items-middle" >
                <LinkDecorated
                  text="Backlog"
                  link={routes.backlog}
                  active={menuActive.backlog}
                />
              </Col>
            </Row>
          </Col>
          <Col className="flex justify-content-center justify-content-lg-end align-items-center " xs={12} lg={4} >
            <span className="price"> Total: </span>
            <span className="price-currency"> $ </span>
            <span className="price-value"> {this.calculatePrice(userStoriesSelected)} </span>
            <Link to={routes.buildIt} className="button-link mb-0">
              <button className="button">
                Build it
              </button>
            </Link>
            <UncontrolledDropdown>
              <DropdownToggle
                color="white"
                className={authenticated ? 'dropdown-avatar logged-in' : 'dropdown-avatar logged-out'}
              >
                <div className="arrow-dropdown">
                  <Arrow />
                </div>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-center">
                <DropdownItem header>
                  {showUser.email}
                </DropdownItem>
                {authenticated ?
                  <DropdownItem onClick={this.logout}>
                    Log Out
                  </DropdownItem> :
                  (
                    <div>
                      <DropdownItem onClick={this.toggle}>
                        Log in
                      </DropdownItem>
                      <div >
                        <Modal
                          className="modal-container"
                          isOpen={this.state.modal && this.state.logout}
                          toggle={this.toggle}
                        >
                          <ModalHeader className="login-header-modal">
                            Please, log in.
                          </ModalHeader>
                          <ModalBody className="login-body-modal">
                            <LoginForm
                              onSubmit={user =>
                                login(user, questions, allAnswersSelected)}
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button color="white" onClick={this.toggle}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
                    </div>
                  )
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

Header.propTypes = {
  logout: func.isRequired,
  login: func.isRequired,
  menuActive: object,
  userStories: object.isRequired,
  userStoriesSelected: array.isRequired,
  authenticated: bool.isRequired,
  user: object.isRequired,
  questions: array,
  allAnswersSelected: object
};

const mapStateToProps = store => ({
  userStories: store.getIn(['userStories', 'userStories']),
  userStoriesSelected: store.getIn(['myApp', 'userStories']).toJS(),
  authenticated: store.getIn(['session', 'authenticated']),
  user: store.getIn(['session', 'user']),
  questions: store.getIn(['question', 'questions']).toJS(),
  allAnswersSelected: store.getIn(['answer', 'selectedAnswers']).toJS()
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout()),
  login: (user, questions, allAnswersSelected) => {
    dispatch(login(user.toJS()))
      .then(dispatch(addSuggestedFeatures(questions, allAnswersSelected)));
  }
});

export default connect(mapStateToProps, mapDispatch)(Header);
