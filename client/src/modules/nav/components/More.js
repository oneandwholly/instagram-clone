import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMore, selectMorePhotoId, selectMoreUsername } from '../selectors'
import * as actions from '../actions'
import { createStructuredSelector } from 'reselect'
import { withRouter} from 'react-router-dom';
import styled from 'styled-components';

class More extends Component {
    handleCancelClick() {
      this.props.hideMore();
    }

    handleDelete() {
      this.props.deletePhoto(this.props.morePhotoId, this.props.moreUsername)
      this.props.history.push('/')
      this.props.hideMore();
    }
    render() {
      if(this.props.visibility) {
        return (
          <OpaqueWrapper>
            <div onClick={this.handleDelete.bind(this)}>delete</div>
            <div onClick={this.handleCancelClick.bind(this)}>cancel</div>
          </OpaqueWrapper>
        )
      }
      return <div></div>
    }
}

const OpaqueWrapper = styled.div`
  position: fixed;
  z-index: 10000;
  background: rgba(54, 25, 25, .5);
  width: 100%;
  height: 100%;
`;

export default withRouter(connect(createStructuredSelector({
      visibility: selectMore,
      morePhotoId: selectMorePhotoId,
      moreUsername: selectMoreUsername
  }), actions)(More))
