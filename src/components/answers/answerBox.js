import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, object, func, number } from 'prop-types';
import ReactSVG from 'react-svg';

class AnswerBox extends Component {
  constructor(props) {
    super(props);
    const { selectedAnswers, question, answer } = this.props;
    this.state = {
      isHover: true,
      isSelected: selectedAnswers[question] &&
                selectedAnswers[question].indexOf(answer) > -1
    };
    this.hover = this.hover.bind(this);
    this.showSelected = this.showSelected.bind(this);
  }

  hover() {
    const { isHover } = this.state;
    this.setState({ isHover: !isHover });
  }

  showSelected() {
    const { isSelected } = this.state;
    const { addAnswer, removeAnswer } = this.props;
    if (isSelected) {
      removeAnswer();
    } else {
      addAnswer();
    }
    this.setState({ isSelected: !isSelected });
  }

  render() {
    const { answer, description, image = {}, hover = {}, order } = this.props;
    const { isHover, isSelected } = this.state;

    const svg = (
      isHover ?
        <ReactSVG src={image.url || ''} height="60px" /> :
        <ReactSVG src={hover.url || ''} height="60px" />
    );
    const imageFormat = (
      isHover ?
        <img src={image.url || ''} alt={answer} /> :
        <img src={hover.url || ''} alt={answer} />
    );
    const arrayPictureName = image && image.url ? (image.url).split('') : [];
    return (
      <div
        className={`answer-box ${
          isSelected ?
            'clicked' :
            ''
        }`}
        onMouseEnter={this.hover}
        onMouseLeave={this.hover}
        onClick={this.showSelected}
        style={{ order }}
      >
        <div className="answer-box-image">
          {
            arrayPictureName[arrayPictureName.length - 1] == 'svg' ?
              svg :
              imageFormat
          }
        </div>
        <div className="answer-name">
          {answer}
        </div>
        <div className="description-name">
          {description}
        </div>
      </div>
    );
  }
}

AnswerBox.propTypes = {
  answer: string.isRequired,
  question: number.isRequired,
  description: string.isRequired,
  order: number.isRequired,
  addAnswer: func.isRequired,
  removeAnswer: func.isRequired,
  image: object,
  hover: object,
  selectedAnswers: object.isRequired
};

const mapStateToProps = state => ({
  selectedAnswers: state.getIn(['answer', 'selectedAnswers']).toJS()
});

export default connect(mapStateToProps)(AnswerBox);
