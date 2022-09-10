import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const VALUE_FEEDBACK = 3;

class FeedBack extends Component {
  render() {
    const { totalHits } = this.props;
    return (
      <div>
        {totalHits >= VALUE_FEEDBACK
          ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <p>{ totalHits }</p>
      </div>
    );
  }
}

const mapStateToProps = ({ score }) => ({
  ...score,
});

FeedBack.propTypes = {
  totalHits: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
