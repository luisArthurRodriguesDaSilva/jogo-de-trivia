import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  ...state.player,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
