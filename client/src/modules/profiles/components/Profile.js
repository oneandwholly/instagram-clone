import React, { Component } from 'react';
import { connect } from 'react-redux';
import nav from '../../nav';
import users from '../../users';
import photos from '../../photos';
import auth from '../../auth';
import { selectAll as selectAllProfiles } from '../selectors';
import { getProfile, fetchMorePhotos, getFollowStatus, toggleFollow } from '../actions';
import { createSelector } from 'reselect';
import FollowButton from './FollowButton';
import UserInfoSection from './UserInfoSection';
import PhotoGrid from './PhotoGrid';
import styled from 'styled-components';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followStatusHasBeenFetched: false
        }
    }
    componentWillMount() {
        this.props.setActive('profile');
        if (!this.props.profile) {
            this.props.getProfile(this.props.match.params.username)
        }
    }
    componentWillReceiveProps(newProps) {
        if (!this.props.profile) {
            if (this.props.match.params.username !== newProps.match.params.username) {
                this.props.getProfile(newProps.match.params.username);
            }
        }
        if (!this.state.followStatusHasBeenFetched) {
            if (newProps.authUserId) {
                if (newProps.user) {
                    if (newProps.authUserId !== newProps.user.id) {
                       this.props.getFollowStatus(newProps.authUserId, newProps.user)
                    }
                   this.setState({ followStatusHasBeenFetched: true })
                }
            }
        }
    }

    fetchMorePhotos() {
        this.props.fetchMorePhotos(this.props.profile.userId, this.props.profile.pageToken, this.props.user.username)
    }

    renderMoreButton() {
        if(this.props.profile.hasMore) {
            return <button style={{backgroundColor: '#458eff', border: '1px solid', width: '82%', height: '28px', borderRadius: '3px', borderColor: '#458eff', fontFamily: 'Roboto', fontWeight: '700', fontSize:'15px', color: 'white'}} onClick={this.fetchMorePhotos.bind(this)}>Load more</button>
        }
        return <div></div>
    }
    render() {
        if (!this.props.profile) {
            return <div>loading profile...</div>
        }
        return (
            <div className={this.props.className}>
                <UserInfoSection user={this.props.user}>
                    <FollowButton toggleFollow={this.props.toggleFollow} authUserId={this.props.authUserId} profileUser={this.props.user} followStatus={this.props.profile.followStatus} />
                </UserInfoSection>
                <PhotoGrid photos={this.props.photos}/>
                <div style={{textAlign: 'center'}}>{this.renderMoreButton()}</div>
            </div>            
        );
    }
}

const StyledProfile = styled(Profile)`
    max-width: 900px;
    margin: 0px auto;
`;

export default connect(createSelector(
    selectAllProfiles,
    users.selectors.selectAll,
    photos.selectors.selectById,
    auth.selectors.selectUserId,
    (state, ownProps) => ownProps.match.params.username,
    (allProfiles, allUsers, allPhotosById, authUserId, username) => {
        let profile = allProfiles[username] ? allProfiles[username] : null;
        let user = allUsers.byId[allUsers.byUsername[username]] ? allUsers.byId[allUsers.byUsername[username]] : null;
        let photos = [];
        if (profile) {
            photos = profile.photoIds.map(photo_id => allPhotosById[photo_id]);
        } 
        return { profile, user, photos, authUserId }
    }
), { setActive: nav.actions.setActive, fetchMorePhotos, getProfile, getFollowStatus, toggleFollow })(StyledProfile);


