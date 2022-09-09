import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ONE_SECOND = 1000;

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timerCount: 30,
    };
  }

  componentDidMount() {
    this.setTimeCount = setInterval(() => {
      this.setState((previewState) => ({ timerCount: previewState.timerCount - 1 }));
    }, ONE_SECOND);
  }

  timeIsEnd = () => {
    const { handleClickAnswer } = this.props;
    clearInterval(this.setTimeCount);
    handleClickAnswer();
  };

  render() {
    const { timerCount } = this.state;
    if (timerCount === 0) { this.timeIsEnd(); }
    return (<h1>{timerCount}</h1>);
  }
}

Timer.propTypes = {
  handleClickAnswer: PropTypes.func.isRequired,
};

export default connect()(Timer);
