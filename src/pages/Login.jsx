import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { fetchToken, newLogin, resetScore } from '../redux/actions';
import { saveToken } from '../services/saveToken';
import { addToLocalStorage, getFromLocalStorage } from '../services/localStorage';
import store from '../redux/store';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      token: '',
    };
  }

  componentDidMount() {
    if (!getFromLocalStorage('ranking')) addToLocalStorage('ranking', []);
  }

  validateBtnPlay = () => {
    const { name, email } = this.state;
    const nameRegex = /^[A-Za-z0-9^ ]{3}/;
    const emailRegex = /^[^@^ ]+@[^@^ ]+\.[a-z]{2,3}(\.[a-z]{2})?$/;

    this.setState({
      isDisabled: !emailRegex.test(email) || !nameRegex.test(name),
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.validateBtnPlay();
    });
  };

  handleClick = async (event) => {
    const { name, email } = this.state;
    const { dispatch, history } = this.props;
    event.preventDefault();

    await dispatch(fetchToken());
    dispatch(newLogin({ name, email }));
    const { tokenObj } = this.props;
    this.setState({ token: tokenObj.token }, () => {
      const { token } = this.state;
      saveToken(token);
    });

    const imgURL = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    const player = { name, score: 0, picture: imgURL };
    const currRanking = getFromLocalStorage('ranking');
    if (currRanking) {
      addToLocalStorage('ranking', [player, ...currRanking]);
    } else {
      addToLocalStorage('ranking', [player]);
    }
    store.dispatch(resetScore(0));
    history.push('/game');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <div>

        <form onSubmit={ this.handleClick }>
          <input
            type="text"
            name="name"
            id="name"
            value={ name }
            placeholder="nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            placeholder="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <input
            type="submit"
            value="Play"
            disabled={ isDisabled }
            data-testid="btn-play"
          />
        </form>

        <div>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClickSettings }
          >
            Settings
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  tokenObj: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ user, token }) => ({
  ...user,
  ...token,
});

export default connect(mapStateToProps)(Login);
