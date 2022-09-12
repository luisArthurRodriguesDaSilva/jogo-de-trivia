import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addPlayerScore } from '../redux/actions';

const VALUE_FEEDBACK = 3;
const INITIAL_TIME = 30;

class FeedBack extends Component {
  handleClickGoHome = () => {
    const { history, dispatch } = this.props;

    dispatch(addPlayerScore(INITIAL_TIME, 0, 0));
    history.push('/');
  };

  render() {
    const { history, score, assertions } = this.props;

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
          onClick={ () => history.push('/ranking') }
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
