import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMain } from '../selectors'
import * as actions from '../actions'
import { createStructuredSelector } from 'reselect'
import { withRouter} from 'react-router-dom';
class MainContent extends Component {
    render() {
      if(this.props.visibility) {
        return (
          <div>
          {this.props.children}
          </div>
        )
      }
      return <div></div>
    }
}

export default withRouter(connect(createStructuredSelector({
      visibility: selectMain,
  }), actions)(MainContent))
