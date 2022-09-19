import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

export default class PlayerCard extends Component {
  render() {
    const { player: { name, picture, score, index } } = this.props;

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(picture).toString()}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </div>
    );
  }
}

PlayerCard.propTypes = {
  name: PropTypes.string,
}.isRequired;
