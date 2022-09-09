import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Timer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (<h1>Timer</h1>);
  }
}

export default connect(mapStateToProps)(Timer);
