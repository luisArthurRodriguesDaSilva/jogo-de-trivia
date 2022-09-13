import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlayerCard extends Component {
  render() {
    const { player: { name, picture, score, index } } = this.props;

    return (
      <div>
        <p>{picture}</p>
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </div>
    );
  }
}

PlayerCard.propTypes = {
  name: PropTypes.string,
}.isRequired;
