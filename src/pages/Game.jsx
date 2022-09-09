import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchQuestion } from '../redux/actions';
import { delToken } from '../services/saveToken';

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
      isAnswer: false,
    };
  }

  async componentDidMount() {
    this.newGame();
  }

  newGame = async () => {
    const { dispatch, token } = this.props;

    await dispatch(fetchQuestion(token));
    this.setState({ indexQuestion: 0 }, () => {
      const { results, responseCode } = this.props;

      if (responseCode === 0) {
        this.shuffleAnswer(0, results);
      }
    });
  };

  buildOrderAnswer = (index, array) => {
    if (array.length === 0) return [];

    let orderAnswer = [{ answer: array[index].correct_answer, isCorrect: true }];

    array[index].incorrect_answers.forEach((item) => {
      orderAnswer = [...orderAnswer, { answer: item, isCorrect: false }];
    });

    return orderAnswer;
  };

  shuffleAnswer = (index, array) => {
    const RANGE = 0.5;
    const TEMP = 3;
    const randomIndexArray = [0, 1, 2, TEMP].sort(() => Math.random() - RANGE);
    const randomBoolIndexArray = [0, 1].sort(() => Math.random() - RANGE);

    const orderAnswer = this.buildOrderAnswer(index, array);

    if (array[index].type === 'multiple') {
      const disorderAnswer = randomIndexArray.map((i) => orderAnswer[i]);

      this.setState({ randomAnswer: disorderAnswer });
    } else if (array[index].type === 'boolean') {
      const disorderAnswer = randomBoolIndexArray.map((i) => orderAnswer[i]);

      this.setState({ randomAnswer: disorderAnswer });
    }
  };

  handleClickAnswer = () => {
    this.setState({ isAnswer: true });
  };

  handleClickNext = () => {
    const { indexQuestion } = this.state;
    const { results } = this.props;
    const MAX_QUESTIONS = 4;

    if (indexQuestion < MAX_QUESTIONS) {
      this.setState({ indexQuestion: indexQuestion + 1 }, () => {
        this.shuffleAnswer(indexQuestion + 1, results);
      });
    } else {
      // end game!
    }
  };

  render() {
    const { randomAnswer, indexQuestion, isAnswer } = this.state;
    const { results, responseCode } = this.props;
    const START_INDEX = -1;
    const ERROR_API_CODE = 3;
    let indexWrongAnswer = START_INDEX;

    return (
      <main>
        {(indexQuestion === 0) && (<p>new game</p>)}
        {
          (responseCode === ERROR_API_CODE) && (delToken())
        }
        {
          (responseCode === ERROR_API_CODE) ? (<Redirect to="/" />)
            : (
              <section>
                <h2 data-testid="question-category">{results[indexQuestion].category}</h2>
                <p data-testid="question-text">{results[indexQuestion].question}</p>
                <div data-testid="answer-options">
                  {
                    randomAnswer.map((item, index) => {
                      if (results[indexQuestion].correct_answer !== item.answer) {
                        indexWrongAnswer += 1;
                      }

                      return (
                        (results[indexQuestion].correct_answer === item.answer)
                          ? (
                            <button
                              key={ index }
                              type="button"
                              data-testid="correct-answer"
                              onClick={ this.handleClickAnswer }
                            >
                              {item.answer}
                            </button>
                          )
                          : (
                            <button
                              key={ index }
                              type="button"
                              data-testid={ `wrong-answer-${indexWrongAnswer}` }
                              onClick={ this.handleClickAnswer }
                            >
                              {item.answer}
                            </button>
                          )
                      );
                    })
                  }
                </div>
                {(isAnswer) && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleClickNext }
                  >
                    Next
                  </button>
                )}
              </section>
            )
        }
      </main>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  responseCode: PropTypes.number.isRequired,
  results: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),

  }).isRequired,
};

const mapStateToProps = ({ token: { tokenObj }, questions }) => {
  const { response_code: responseCode, results } = questions;

  return ({
    ...tokenObj,
    responseCode,
    results,
  });
};

export default connect(mapStateToProps)(Game);
