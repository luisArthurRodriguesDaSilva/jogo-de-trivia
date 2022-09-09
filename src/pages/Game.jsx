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
    };
  }

  async componentDidMount() {
    const { dispatch, token } = this.props;
    const { indexQuestion } = this.state;
    const RANGE = 0.5;
    const randomIndexArray = [0, 1, 2, 3].sort(() => Math.random() - RANGE);

    await dispatch(fetchQuestion(''));
    const { results } = this.props;

    if (token !== '') {
      const orderAnswer = this.buildOrderAnswer(indexQuestion);
      const disorderAnswer = randomIndexArray.map((i) => orderAnswer[i]);

      if (orderAnswer.length > 2) {
        this.setState({ randomAnswer: disorderAnswer });
      } else if (orderAnswer.length > 0) {
        const valueTrue = results[indexQuestion].correct_answer.toLowerCase();
        const valueFalse = results[indexQuestion].incorrect_answers[0].toLowerCase();

        this.setState({ randomAnswer: [
          { answer: 'True', isCorrect: valueTrue === 'true' },
          { answer: 'False', isCorrect: valueFalse === 'true' },
        ] });

        console.log(valueTrue);
        console.log(valueFalse);
      }
    }
  }

  // testewsahwaqqyaqgawadafaae
  buildOrderAnswer = (index) => {
    const { results } = this.props;
    const orderAnswer = [{ answer: results[index].correct_answer, isCorrect: true }];

    results[index].incorrect_answers.forEach((item) => {
      orderAnswer.push({ answer: item, isCorrect: false });
    });

    return orderAnswer;
  };

  render() {
    const { randomAnswer, indexQuestion } = this.state;
    const { results, responseCode } = this.props;
    const START_INDEX = -1;
    const ERROR_API_CODE = 3;
    let indexWrongAnswer = START_INDEX;

    return (
      <main>
        <p>new game</p>
        {
          (responseCode === ERROR_API_CODE) && (delToken())
        }
        {
          (responseCode === ERROR_API_CODE) ? (<Redirect to="/" />)
            : (
              <section>
                <h2 data-testid="question-category">{results[indexQuestion].category}</h2>
                <p data-testid="question-text">{results[indexQuestion].question}</p>
                <p>
                  teste:
                  {' '}
                  {randomAnswer[0].answer}
                </p>
                <div data-testid="answer-options">
                  {
                    randomAnswer.map((item, index) => {
                      if (!item.isCorrect) indexWrongAnswer += 1;

                      return (
                        (item.isCorrect)
                          ? (
                            <button
                              key={ index }
                              type="button"
                              data-testid="correct-answer"
                            >
                              {item.answer}
                            </button>
                          )
                          : (
                            <button
                              key={ index }
                              type="button"
                              data-testid={ `wrong-answer-${indexWrongAnswer}` }
                            >
                              {item.answer}
                            </button>
                          )
                      );
                    })
                  }
                </div>
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
