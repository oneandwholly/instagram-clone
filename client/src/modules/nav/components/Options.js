import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectOptions } from '../selectors'
import * as actions from '../actions'
import { createStructuredSelector } from 'reselect'
import { Redirect, withRouter } from 'react-router-dom';
class Options extends Component {

  handleLogout() {
    localStorage.removeItem('token');
    this.props.logout();
    this.props.setHasTokenToFalse();
    this.props.history.push('/')
  }

  handleBackClick() {
    this.props.hideOptions();
    this.props.showTopNav();
    this.props.showBottomNav();
    this.props.showMain();
  }

    render() {
      if (this.props.visibility) {
        return (
          <div>
            <div onClick={this.handleBackClick.bind(this)}>x</div>
            <button onClick={this.handleLogout.bind(this)}>logout</button>
          </div>
        );
      }
      return <div></div>;
    }
}

export default withRouter(connect(createStructuredSelector({
      visibility: selectOptions,
  }), actions)(Options))
