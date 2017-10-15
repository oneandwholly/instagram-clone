import React, { Component } from 'react';

class FollowButton extends Component {
    toggleFollow() {
        this.props.toggleFollow(this.props.followStatus, this.props.profileUser);
    }

    renderFollowButton() {
        if (this.props.authUserId === this.props.profileUser.id) {
            return <button>edit</button>
        }
        if (this.props.followStatus) {
            return <button onClick={this.toggleFollow.bind(this)}>following</button>
        }
        return <button onClick={this.toggleFollow.bind(this)}>follow</button>;
    }
    render() {
        return (
            <div>
                {this.renderFollowButton()}
            </div>
        ); 
    }
}

export default FollowButton;