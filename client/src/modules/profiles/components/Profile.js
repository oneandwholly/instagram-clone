import React, { Component } from 'react';
import { connect } from 'react-redux';
import nav from '../../nav';
import users from '../../users';
import photos from '../../photos';
//import auth from '../../auth';
import { selectAll as selectAllProfiles } from '../selectors';
import { getProfile, fetchMorePhotos } from '../actions';
import { createSelector } from 'reselect';

class Profile extends Component {
    componentWillMount() {
        this.props.setActive('profile');
        if (!this.props.profile) {
            this.props.getProfile(this.props.match.params.username)
        }
    }
    componentWillReceiveProps(newProps) {
        if (this.props.match.params.username !== newProps.match.params.username) {
            this.props.getProfile(newProps.match.params.username);
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
                <div>{this.props.user.username}</div>
                <div>{this.renderMoreButton()}</div>
            </div>            
        );
    }
}

export default connect(createSelector(
    selectAllProfiles,
    users.selectors.selectAll,
    photos.selectors.selectById,
    (state, ownProps) => ownProps.match.params.username,
    (allProfiles, allUsers, allPhotosById, username) => {
        let profile = allProfiles[username] ? allProfiles[username] : null;
        let user = allUsers.byId[allUsers.byUsername[username]] ? allUsers.byId[allUsers.byUsername[username]] : null;
        let photos = [];
        if (profile) {
            photos = profile.photoIds.map(photo_id => allPhotosById[photo_id]);
        } 
        return { profile, user, photos }
    }
), { setActive: nav.actions.setActive, fetchMorePhotos, getProfile })(Profile);

// class Profile extends Component {
//     componentWillMount() {
//         this.props.setActive('profile');
//         if (!this.props.userProfile) {
//             console.log('should fetch profile')
//             this.props.fetchProfile(this.props.match.params.username);
//         }
//     }
//     render() {
//         return (
//             <div>Profile</div>
//         );
//     }
// }

// export default connect(createSelector(
//     selectAllProfiles,
//     (state, ownProps) => ownProps,
//     (allProfiles, ownProps) => {
//         let userProfile = null;

//         if (allProfiles[ownProps.match.params.username]) {
//             userProfile = allProfiles[ownProps.match.params.username];
//         }

//         return { userProfile };
//     }
// ), { setActive: nav.actions.setActive, fetchProfile })(Profile);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import nav from '../../nav';
// import users from '../../users';
// import auth from '../../auth';
// import { createSelector } from 'reselect';

// class Profile extends Component {
//     componentWillMount() {
//         this.props.setActive('profile');
//         //console.log(this.props.authUser, this.props.profileUser);
//         if (!this.props.profileUser) {
//             console.log('should fetch profile user')
//         }
//     }
//     render() {
//         console.log('rendering')
//         console.log(this.props.authUser, this.props.profileUser);
//         return (
//             <div>Profile</div>
//         );
//     }
// }

// export default connect(createSelector(
//     users.selectors.selectAll,
//     auth.selectors.selectUserId,
//     (state, ownProps) => ownProps.match.params.username,
//     (users, authUserId, profileUsername) => {
//         let authUser = null;
//         let profileUser = null;
        
//         if (authUserId) {
//             authUser = users.byId[authUserId];
//         }

//         if (profileUsername) {
//             profileUser = users.byId[users.byUsername[profileUsername]];
//         }
//         return { authUser, profileUser }
//     }
// ), { setActive: nav.actions.setActive })(Profile);

