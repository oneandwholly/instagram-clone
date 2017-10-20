import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectOptions } from '../selectors'
import * as actions from '../actions'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom';
import core from '../../core';

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
            <core.components.ListItem>
              <div style={{textAlign: 'center', padding: '16px'}} onClick={this.handleBackClick.bind(this)}>Back</div>
            </core.components.ListItem>
            <core.components.ListItem>
              <div style={{textAlign: 'center', padding: '16px'}} onClick={this.handleLogout.bind(this)}>Log Out</div>
            </core.components.ListItem>
          </div>
        );
      }
      return <div></div>;
    }
}

export default withRouter(connect(createStructuredSelector({
      visibility: selectOptions,
  }), actions)(Options))
