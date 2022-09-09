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
    const { indexQuestion } = this.state;
    const RANGE = 0.5;
    const randomIndexArray = [0, 1, 2, 3].sort(() => Math.random() - RANGE);

    await dispatch(fetchQuestion(token));

    const orderAnswer = this.buildOrderAnswer(indexQuestion);
    const disorderAnswer = randomIndexArray.map((i) => orderAnswer[i]);
    console.log(orderAnswer);

    if (orderAnswer.length > 2) {
      this.setState({ randomAnswer: disorderAnswer });
    } else {
      this.setState({ randomAnswer: orderAnswer });
    }
  }

  buildOrderAnswer = (index) => {
    const { results } = this.props;
    console.log(results);
    const orderAnswer = [{ answer: results[index].correct_answer, isCorrect: true }];

    results[index].incorrect_answers.forEach((item) => {
      orderAnswer.push({ answer: item, isCorrect: false });
    });

    return orderAnswer;
  };

  render() {
    const { randomAnswer, indexQuestion } = this.state;
    const { results } = this.props;
    const START_INDEX = -1;
    let indexWrongAnswer = START_INDEX;
    console.log(randomAnswer);

    return (
      <main>
        <p>new game</p>
        <h2 data-testid="question-category">{results[indexQuestion].category}</h2>
        <p data-testid="question-text">{results[indexQuestion].question}</p>
        <ul data-testid="answer-options">
          {
            randomAnswer.map((item) => {
              indexWrongAnswer += 1;

              return (
                <li key={ item.answer }>
                  {
                    (item.isCorrect)
                      ? (
                        <button
                          type="button"
                          data-testid="correct-answer"
                        >
                          {item.answer}
                        </button>
                      )
                      : (
                        <button
                          type="button"
                          data-testid={ `wrong-answer-${indexWrongAnswer}` }
                        >
                          {item.answer}
                        </button>
                      )
                  }
                </li>
              );
            })
          }
        </ul>
      </main>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  results: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),

  }).isRequired,
};

const mapStateToProps = ({ token: { tokenObj }, questions: { questionObj } }) => ({
  ...tokenObj,
  ...questionObj,
});

export default connect(mapStateToProps)(Game);
