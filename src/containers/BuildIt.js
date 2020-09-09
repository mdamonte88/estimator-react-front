import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PropTypes, func } from 'prop-types';
import routes from '../constants/routesPaths';
import LabelDecoration from '../icons/LabelDecoration';
import EditIcon from '../icons/Edit';
import IconBuildIt from '../icons/IconBuildIt';
import { MODULE_CATEGORIES, USER_STORIES } from '../constants/constants';
import { contactUs } from '../actions/appActions';

const calculatePrices = ({
  userStories,
  modules,
  addedUserStories,
  addedModules
}) => {
  let totalPrice = 0;
  let category;
  let price;
  const allPriceCategory = {};
  const tablePriceCategory = [];
  addedModules.forEach((moduleId) => {
    const singleModule = modules[moduleId];
    const firstModuleCategory = singleModule[MODULE_CATEGORIES][0];

    if (firstModuleCategory
      && !allPriceCategory[firstModuleCategory.id]) {
      allPriceCategory[firstModuleCategory.id] = {
        name: firstModuleCategory.name,
        price: 0
      };
    }

    addedUserStories.forEach((userStorySelectedId) => {
      const {
        featureModuleId,
        price
      } = userStories[USER_STORIES][userStorySelectedId];
      if (featureModuleId == moduleId) {
        allPriceCategory[firstModuleCategory.id].price += price;
      }
    });
  });
  Object.keys(allPriceCategory).forEach((priceCategory, index) => {
    category = <td className="text-format">{allPriceCategory[priceCategory].name}</td>;
    price = <td className="text-format">${allPriceCategory[priceCategory].price}</td>;
    tablePriceCategory.push(<tr key={index}>{category}{price}</tr>);
    totalPrice += allPriceCategory[priceCategory].price;
  });
  return [tablePriceCategory, totalPrice];
};

class BuildIt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      email: '',
      message: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInput(e) {
    if (e.target.id == 'exampleName') {
      this.setState({
        name: e.target.value
      });
    } else if (e.target.id == 'exampleEmail') {
      this.setState({
        email: e.target.value
      });
    } else {
      this.setState({
        message: e.target.value
      });
    }
  }

  render() {
    const { modal, name, email, message } = this.state;
    const {
      answers,
      questions,
      userStories,
      modules,
      nameApp,
      addedUserStories,
      sendMessage,
      addedModules
    } = this.props;
    const firstQuestion = questions && questions[0];
    const answersFirstQuestion = firstQuestion && answers &&
      answers[firstQuestion.id];
    let totalPrice = 0;
    let tablePriceCategory = {};
    [tablePriceCategory, totalPrice] = calculatePrices({
      userStories,
      modules,
      addedUserStories,
      addedModules
    });
    return (
      <Container className="build-it background-page">
        <Row className="close-build-it">
          <Col>
            <Link to={routes.myApp}>
              X
            </Link>
          </Col>
        </Row>
        <Row className="container-title title">
          <Col>
            Added Features
          </Col>
        </Row>
        <Row className="container-sub-title sub-title">
          <Col>
            The features are grouped by categories.
          </Col>
        </Row>
        <Row className="row-box">
          <Col className="col-md-4 offset-md-4 box-categories-list">
            <Row>
              <Col>
                <table className="categories-list">
                  <tbody>
                    <tr>
                      <td>
                        <div className="app-info-general">
                          <IconBuildIt />
                          <div className="content-name-platform">
                            <div className="text-name-app">
                              {nameApp}
                            </div>
                            {answersFirstQuestion && answersFirstQuestion
                              .map((platform, index) =>
                                <div className="text-platform" key={index}>
                                  {platform}
                                </div>)}
                          </div>
                        </div>
                      </td>
                      <td className="link-decorated active">
                        <h1 className="text-format price-container">Total:</h1> $ {totalPrice}
                        <div className="decoration" >
                          <LabelDecoration />
                        </div>
                      </td>
                    </tr>
                    {tablePriceCategory}
                  </tbody>
                </table>
              </Col>
              <Col className="col-md-6 container-link link-decorated active">
                <Link to={routes.myApp} className="link">
                  <EditIcon /> EDIT
                  <div className="decoration" >
                    <LabelDecoration />
                  </div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="row-box">
          <Col className="col-md-4 offset-md-4 box-obtain-product">
            <Row>
              <Col className="col-lg-8 title-box-obtain-product">
                <Row>
                  <Col>
                    Download Package
                    <div className="style-text-free">
                      FREE
                    </div>
                  </Col>
                </Row>
                <Row className="container-text">
                  <Col>
                    The web feed is the primary system through which users are exposed to content.
                  </Col>
                </Row>
              </Col>
              <Col className="col-lg-4 content-button-build">
                <button className="button-build">
                  Download
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="row-box">
          <Col className="col-md-4 offset-md-4 box-obtain-product">
            <Row>
              <Col className="col-lg-8 title-box-obtain-product">
                <Row>
                  <Col>
                    Build it with us
                  </Col>
                </Row>
                <Row className="container-text">
                  <Col>
                    The web feed is the primary system through which users are exposed to content.
                  </Col>
                </Row>
              </Col>
              <Col className="col-lg-4 content-button-build">
                <Button className="button-build" onClick={this.toggle}>Contact Us</Button>
                <Modal isOpen={modal} className="modal_contact_us">
                  <ModalHeader>Contact Rootstrap</ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Input onChange={this.handleInput} value={name} type="text" name="name" id="exampleName" placeholder="NAME" className="modal_contact_us__input" />
                      </FormGroup>
                      <FormGroup>
                        <Input onChange={this.handleInput} value={email} type="email" name="email" id="exampleEmail" placeholder="E-MAIL" className="modal_contact_us__input" />
                      </FormGroup>
                      <FormGroup>
                        <Input onChange={this.handleInput} value={message} type="textarea" name="message" id="exampleMessage" placeholder="MESSAGE" className="modal_contact_us__input" />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => sendMessage(name, email, message)} className="next-question little">Send</Button>
                    <Button color="secondary" onClick={this.toggle} className="next-question little cancel">Cancel</Button>
                  </ModalFooter>
                </Modal>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

BuildIt.propTypes = {
  userStories: PropTypes.object,
  modules: PropTypes.object,
  nameApp: PropTypes.string,
  answers: PropTypes.object,
  questions: PropTypes.array,
  addedUserStories: PropTypes.array,
  sendMessage: func.isRequired,
  addedModules: PropTypes.array
};

const mapStateToProps = state => ({
  nameApp: state.getIn(['myApp', 'name']),
  userStories: state.getIn(['userStories']).toJS(),
  modules: state.getIn(['module', 'modules']).toJS(),
  answers: state.getIn(['answer', 'selectedAnswers']).toJS(),
  questions: state.getIn(['question', 'questions']).toJS(),
  addedUserStories: state.getIn(['myApp', 'userStories']).toJS(),
  addedModules: state.getIn(['myApp', 'addedIds']).toJS(),
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (name, email, message) =>
    dispatch(contactUs(name, email, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildIt);
