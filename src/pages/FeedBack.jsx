import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const VALUE_FEEDBACK = 3;

class FeedBack extends Component {
  render() {
    const { totalHits, history } = this.props;

    return (
      <div>
        {totalHits >= VALUE_FEEDBACK
          ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ score }) => ({
  ...score,
});

FeedBack.propTypes = {
  totalHits: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(FeedBack);
