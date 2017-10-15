import React, { Component } from 'react';
import styled from 'styled-components';

class FollowButton extends Component {
    toggleFollow() {
        this.props.toggleFollow(this.props.followStatus, this.props.profileUser);
    }

    renderFollowButton() {
        if (this.props.authUserId === this.props.profileUser.id) {
            return <EditProfile>Edit Profile</EditProfile>
        }
        if (this.props.followStatus) {
            return <Following onClick={this.toggleFollow.bind(this)}>Following</Following>
        }
        return <Follow onClick={this.toggleFollow.bind(this)}>Follow</Follow>;
    }
    render() {
        return (
            <div>
                {this.renderFollowButton()}
            </div>
        ); 
    }
}

const Following = styled.button`
    width: 82%;
    height: 28px;
    background-color: white;
    border: 1px solid;
    border-radius: 3px;
    border-color: #ddd;
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 15px;
`;
const Follow = styled.button`
width: 82%;
height: 28px;
background-color: #458eff;
border: 1px solid;
border-radius: 3px;
border-color: #458eff;
font-family: 'Roboto';
font-weight: 700;
font-size: 15px;
color: white;
`;
const EditProfile = styled.button`
white-space: nowrap;
width: 100%;
height: 28px;
background-color: white;
border: 1px solid;
border-radius: 3px;
border-color: #ddd;
font-family: 'Roboto';
font-weight: 500;
font-size: 15px;
`;

export default FollowButton;