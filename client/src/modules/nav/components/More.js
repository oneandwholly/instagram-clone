import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMore, selectMorePhotoId, selectMoreUsername } from '../selectors'
import * as actions from '../actions'
import { createStructuredSelector } from 'reselect'
import { withRouter} from 'react-router-dom';
import styled from 'styled-components';
import core from '../../core';
import auth from '../../auth';
import users from '../../users';

class More extends Component {
    handleCancelClick() {
      this.props.hideMore();
    }

    handleDelete() {
      this.props.deletePhoto(this.props.morePhotoId, this.props.moreUsername)
      this.props.history.push('/')
      this.props.hideMore();
    }

    renderDeleteButton() {
      if(this.props.allUsers[this.props.authUserId].username === this.props.moreUsername) {
        return (
          <core.components.ListItem>
            <div style={{textAlign: 'center', padding: '16px'}} onClick={this.handleDelete.bind(this)}>Delete</div>
          </core.components.ListItem>
        );
      }

      return <div></div>
    }
    render() {
      if(this.props.visibility) {
        return (
          <OpaqueWrapper>
            {this.renderDeleteButton()}
            <core.components.ListItem>
            <div style={{textAlign: 'center' , padding: '16px'}} onClick={this.handleCancelClick.bind(this)}>Cancel</div>
            </core.components.ListItem>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default withRouter(connect(createStructuredSelector({
      visibility: selectMore,
      morePhotoId: selectMorePhotoId,
      moreUsername: selectMoreUsername,
      authUserId: auth.selectors.selectUserId,
      allUsers: users.selectors.selectById
  }), actions)(More))
