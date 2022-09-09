import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestion } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      indexQuestion: 0,
      randomAnswer: [
        {
          answer: '',
          isCorrect: false,
        },
      ],
    };
  }

  async componentDidMount() {
    const { dispatch, token } = this.props;
    const { randomAnswer } = this.state;

    await dispatch(fetchQuestion(token));

    this.buildOrderAnswer(0);
  }

  buildOrderAnswer = (index) => {
    const { results } = this.props;
    const orderAnswer = [{ answer: results[index].correct_answer, isCorrect: true }];

    results[index].incorrect_answers.forEach((item) => {
      orderAnswer.push({ answer: item, isCorrect: false });
    });

    console.log(orderAnswer);
    return orderAnswer;
  };

  render() {
    return (
      <p>new game</p>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ token: { tokenObj }, questions: { questionObj } }) => ({
  ...tokenObj,
  ...questionObj,
});

export default connect(mapStateToProps)(Game);
