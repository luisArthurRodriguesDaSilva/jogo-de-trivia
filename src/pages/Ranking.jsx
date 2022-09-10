import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userScore } from '../redux/actions';

class Ranking extends Component {
  handleClickGoHome = () => {
    const { history, dispatch } = this.props;

    dispatch(userScore(0));
    history.push('/');
  };

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickGoHome }
        >
          Tela Inicial
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
