//import axios from 'axios';
import * as p from './actionTypes';
import users from '../users';
import photos from '../photos';

export const getProfile = (username) => {
    return (dispatch, getState) => {
        let profile = { userId: null, photoIds: [], pageToken: null, hasMore: false }

        let userPromise = new Promise((resolve, reject) => {
            let userId = getState().users.byUsername[username];
            if (userId) {
                profile.userId = userId
                resolve();
            } else {
                //fetch user and add it to profile.userId
                dispatch(users.actions.fetchUserWithUsername(username))
                    .then(() => {
                        profile.userId = getState().users.byUsername[username];
                        resolve();
                    })
            }
        })

        userPromise.then(() => {
            dispatch(photos.actions.fetchRecentPhotosByUserId(profile.userId))
                .then((res) => {
                    const photoIds = res.photos.map(photo => photo.id)
                    dispatch({
                        type: p.ADD_PHOTOS,
                        payload: { photoIds, username, pageToken: photoIds[photoIds.length-1], hasMore: res.hasMore }
                    })
                })
            dispatch({
                type: p.ADD,
                payload: { profile, username }
            });
        })


    }
}

export const fetchMorePhotos = (userId, pageToken, username) => {
    return (dispatch) => {
        dispatch(photos.actions.fetchRecentPhotosByUserId(userId, pageToken))
            .then((res) => {
                const photoIds = res.photos.map(photo => photo.id)
                dispatch({
                    type: p.ADD_PHOTOS,
                    payload: { photoIds, username, pageToken: photoIds[photoIds.length-1], hasMore: res.hasMore }
                })
            })
    }
}
