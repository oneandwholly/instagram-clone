import axios from 'axios';
import * as p from './actionTypes';

export const addPhoto = (photo) => {
    return (dispatch) => {
        dispatch({
            type: p.ADD,
            payload: photo
        });
    }
}

export const addPhotos = (photos) => {
    return (dispatch) => {
        dispatch({
            type: p.ADD_ARRAY,
            payload: photos
        })
    }
}


export const fetchRecentPhotosByUserId = (userId, pageToken) => {
    let query = `${window.location.protocol}//${window.location.host}/api/users/${userId}/photos/recent?`;
    if (pageToken) {
        query += `max_id=${pageToken}`;
    }
    return (dispatch) => {
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        return axios.get(query, config)
        .then(res => {
            const photos = res.data;
            dispatch(addPhotos(photos));
            return photos;
        })
    }
}

export const fetchMorePhotos = (userId, pageToken) => {
    return (dispatch) => {
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        return axios.get(`${window.location.protocol}//${window.location.host}/api/users/${userId}/photos/recent?max_id=${pageToken}`, config)
        .then(res => {
            const photos = res.data;
            dispatch(addPhotos(photos));
            return photos;
        })
    }
}


export function postPhotos(data, cb) {
    return function(dispatch) {
        let body = new FormData(); 
        let file = data.files[0];
        let caption = data.caption;
        let user_id = data.user_id;

        body.append('file', file);
        body.append('caption', caption);
        body.append('user_id', user_id);
  
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        return axios.post(`${window.location.protocol}//${window.location.host}/api/photos`, body, config)
        .then(res => {
            const photo = res.data;
            dispatch(addPhoto(photo));
            cb();
        })
    }
  }