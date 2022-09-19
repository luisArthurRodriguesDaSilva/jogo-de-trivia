import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { returnToTheDefaultState } from '../redux/actions';
// import { addPlayerScore } from '../redux/actions';
import { addToLocalStorage, getFromLocalStorage } from '../services/localStorage';

const VALUE_FEEDBACK = 3;

class FeedBack extends Component {
  componentDidMount() {
    const { score } = this.props;
    const storage = getFromLocalStorage('ranking');

    const currPlayer = storage[0];
    const newRanking = storage
      .filter(({ name }) => name !== currPlayer.name);
    let actualRanking = storage
      .find(({ name }, index) => name === currPlayer.name && index !== 0);

    if (!actualRanking) { actualRanking = { score: -1 }; }
    if (actualRanking.score < score) {
      currPlayer.score = score;
      addToLocalStorage('ranking', [currPlayer, ...newRanking]);
    } else {
      addToLocalStorage('ranking', [actualRanking, ...newRanking]);
    }
  }

  handleClickGoHome = () => {
    const { history, dispatch } = this.props;

    dispatch(returnToTheDefaultState());
    // dispatch(addPlayerScore(INITIAL_TIME, 0, 0));
    history.push('/');
  };

  handleClickGoRanking = () => {
    const { history } = this.props;

    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;

    return (
      <div>
        <Header />
        {assertions >= VALUE_FEEDBACK
          ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        {/* <h4>Total de perguntas certas:</h4> */}
        <p data-testid="feedback-total-score">{score}</p>
        {/* <h4>Total de pontos:</h4> */}
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickGoRanking }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClickGoHome }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

FeedBack.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
