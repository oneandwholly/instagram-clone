import photos from '../photos';
import comments from '../comments';
import axios from 'axios';
import * as c from './actionTypes';

export const getCard = (photoId) => {
    return (dispatch, getState) => {
        if (getState().photos.byId[photoId]) {
            dispatch({
                type: c.ADD_PHOTO,
                payload: { photoId }
            })
        } else {
            dispatch(photos.actions.fetchPhoto(photoId))
                .then((photoId) => {
                    dispatch({
                        type: c.ADD_PHOTO,
                        payload: { photoId }
                    })
                })
        }
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        axios.get(`${window.location.protocol}//${window.location.host}/api/photos/${photoId}/relationship`, config)
        .then(res => {
            dispatch({
                type: c.FETCH_LIKE_STATUS,
                payload: { photoId, likeStatus: res.data.likedByUser}
            })
        })
        
        dispatch(comments.actions.fetchComments(photoId))
            .then((comments) => {
                dispatch({
                    type: c.ADD_COMMENTS,
                    payload: {photoId, comments}
                })
            })
    }
}

export const likePhoto = (photoId) => {
    return (dispatch) => {
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        axios.post(`${window.location.protocol}//${window.location.host}/api/photos/${photoId}/likes`, null, config)
        .then(res => {
            if (res.data.affectedRows === 1) {
                dispatch({
                    type: c.UPDATE_LIKE_STATUS,
                    payload: { photoId, likeStatus: true}
                })
            }
        })
    }
}

export const unlikePhoto = (photoId) => {
    return (dispatch) => {
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        axios.delete(`${window.location.protocol}//${window.location.host}/api/photos/${photoId}/likes`, config)
        .then(res => {
            if (res.data.affectedRows === 1) {
                dispatch({
                    type: c.UPDATE_LIKE_STATUS,
                    payload: { photoId, likeStatus: false}
                })
            }
        })
    }
}

export const addComment = (photoId, text) => {
    return (dispatch) => {
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        return axios.post(`${window.location.protocol}//${window.location.host}/api/photos/${photoId}/comments?text=${text}`, null, config)
        .then(res => {
            const comment = res.data;
            dispatch({
                type: c.ADD_COMMENT,
                payload: { photoId, comment }
            })
        })
    }
}

// export const deleteComment = (commentId) => {
//     return (dispatch) => {
//         const config = {
//             headers: { authorization: localStorage.getItem('token')}
//         };
        
//         axios.delete(`${window.location.protocol}//${window.location.host}/api/photos/${photoId}/comments/${commentId}`, config)
//         .then(res => {
//             const comment = res.data;
//             dispatch({
//                 type: c.ADD_COMMENT,
//                 payload: { photoId, comment }
//             })
//         })
//     }
// }