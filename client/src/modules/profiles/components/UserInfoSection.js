import React, { Component } from 'react';
import styled from 'styled-components';

class UserInfoSection extends Component {
    render() {
        return (
            <div>
                <Top>
                    <ProfilePicture src='https://scontent-bom1-1.cdninstagram.com/t51.2885-19/11906329_960233084022564_1448528159_a.jpg'/>
                    <UsernameAndFollowStatus>
                        <Username>{this.props.user.username}</Username>
                        {this.props.children}
                    </UsernameAndFollowStatus>
                </Top>
                <Middle>{this.props.user.username}</Middle>
                <Bottom>
                    <NumOfPosts><div><b>{this.props.user.counts.photos}</b></div><div style={{ fontSize: '14px', color: '#999'}}>posts</div></NumOfPosts>
                    <NumOfFollowers><div><b>{this.props.user.counts.followed_by}</b></div><div style={{ fontSize: '14px', color: '#999'}}>followers</div></NumOfFollowers>
                    <NumOfFollowing><div><b>{this.props.user.counts.follows}</b></div><div style={{ fontSize: '14px', color: '#999'}}>following</div></NumOfFollowing>
                </Bottom>
            </div>
        );
    }
}


const Top = styled.div`
    margin: 30px 16px 22px 16px;
    display: flex;
`;

const UsernameAndFollowStatus = styled.div`
    width:100%;
    height:inherit;
`;

const Username = styled.div`
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 12px;
`;

const ProfilePicture = styled.img`
    border: 1px solid;
    border-radius: 50%;
    border-color: #e7e7e7;
    margin-right: 28px;
    height: 78px
`;

const Middle = styled.div`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 15px;
    padding: 0 16px 24px 16px;
    border-bottom: 1px solid #eee;
    margin-bottom: 12px;
`;

const Bottom = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 15px;
`;

const NumOfPosts = styled.div`
    width:33%;
`;

const NumOfFollowers = styled.div`
    width:33%
`;

const NumOfFollowing = styled.div`
    width:33%   
`;

export default UserInfoSection;