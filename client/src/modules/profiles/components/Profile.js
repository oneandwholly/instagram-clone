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
import { Link } from 'react-router-dom';
import UserInfoSection from './UserInfoSection';

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
            return <button onClick={this.fetchMorePhotos.bind(this)}>Load more</button>
        }
        return <div></div>
    }
    render() {
        if (!this.props.profile) {
            return <div>loading profile...</div>
        }
        return (
            <div>
                <UserInfoSection user={this.props.user}>
                    <FollowButton toggleFollow={this.props.toggleFollow} authUserId={this.props.authUserId} profileUser={this.props.user} followStatus={this.props.profile.followStatus} />
                </UserInfoSection>
                <div>{this.props.photos.map(photo => {
                    return <Link key={photo.id} to={`/p/${photo.id}`}><img src={photo.image_url} alt=''/></Link>
                })}</div>
                <div>{this.renderMoreButton()}</div>
            </div>            
        );
    }
}

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
), { setActive: nav.actions.setActive, fetchMorePhotos, getProfile, getFollowStatus, toggleFollow })(Profile);


