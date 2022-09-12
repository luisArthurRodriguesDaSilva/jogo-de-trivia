import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const VALUE_FEEDBACK = 3;

class FeedBack extends Component {
  render() {
    const { totalHits, history, totalScore } = this.props;

    return (
      <div>
        <Header />
        {totalHits >= VALUE_FEEDBACK
          ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        {/* <h4>Total de perguntas certas:</h4> */}
        <p data-testid="feedback-total-score">{totalScore}</p>
        {/* <h4>Total de pontos:</h4> */}
        <p data-testid="feedback-total-question">{totalHits}</p>
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
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ score, player }) => ({
  ...score,
  totalScore: player.score,
});

FeedBack.propTypes = {
  totalHits: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  totalScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
