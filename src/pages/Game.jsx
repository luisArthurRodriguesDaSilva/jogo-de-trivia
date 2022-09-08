import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestion } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      indexQuestion: 0,
      actualQuestion: [
        {
          quest: '',
          isCorrect: false,
        },
      ],
    };
  }

  async componentDidMount() {
    const { dispatch, token, results } = this.props;
    const { indexQuestion, actualQuestion } = this.state;

    await dispatch(fetchQuestion(token));
    console.log(results);
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

const mapStateToProps = ({ token: { tokenObj }, questions: { questionObj } }) => ({
  ...tokenObj,
  ...questionObj,
});

export default connect(mapStateToProps)(Game);
