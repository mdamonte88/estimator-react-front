import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { Link } from 'react-router-dom';
import NextStepButton from '../common/NextStepButton';
import InputDecoration from '../../icons/InputDecoration';

class OpenQuestion extends Component {
  state = {
    answerValue: this.props.inputInitialValue || ''
  };

  setInputValue = (e) => {
    this.setState({
      answerValue: e.target.value
    });
  };

  isInputEmpty = () => (
    this.state.answerValue.trim() === ''
  );

  isValid = () => {
    const { validateType } = this.props;
    return ((validateType && validateType(this.state.answerValue)) || false);
  };

  render() {
    const { answerValue } = this.state;
    const {
      title,
      subTitle,
      inputPlaceholder,
      buttonLink,
      handleSubmit,
      buttonText,
      footerLink,
      footerText
    } = this.props;

    return (
      <div className="open-question">
        <div className="title">
          {title}
        </div>
        <div className="sub-title">
          {subTitle}
        </div>
        <div className="input-decoration">
          <input
            type="text"
            spellCheck="false"
            placeholder={inputPlaceholder}
            value={answerValue}
            onChange={this.setInputValue}
          />
          <div className={`decoration ${this.isInputEmpty() ? 'hide' : ''}`}>
            <InputDecoration />
          </div>
        </div>
        <Link to={buttonLink} className="button-link">
          <NextStepButton
            disabled={this.isInputEmpty() || this.isValid()}
            onClick={() => handleSubmit(answerValue)}
            label={buttonText}
          />
        </Link>
        <Link to={footerLink} className="link">
          {footerText}
        </Link>
      </div>
    );
  }
}

OpenQuestion.propTypes = {
  title: string,
  subTitle: string,
  inputInitialValue: string,
  inputPlaceholder: string.isRequired,
  buttonText: string.isRequired,
  buttonLink: string.isRequired,
  handleSubmit: func.isRequired,
  footerText: string,
  footerLink: string,
  validateType: func
};

export default OpenQuestion;
