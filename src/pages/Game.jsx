import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestion } from '../redux/actions';

class Game extends Component {
  async componentDidMount() {
    const { dispatch, token } = this.props;

    await dispatch(fetchQuestion(token));
  }

  render() {
    return (
      <p>new game</p>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ token: { tokenObj } }) => ({
  ...tokenObj,
});

export default connect(mapStateToProps)(Game);
