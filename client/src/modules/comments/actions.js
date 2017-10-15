import axios from 'axios';

export const fetchComments = (photoId) => {
    return (dispatch) => {
        const config = {
            headers: { authorization: localStorage.getItem('token')}
        };
        return axios.get(`${window.location.protocol}//${window.location.host}/api/photos/${photoId}/comments`, config)
        .then(res => {
            const comments = res.data;
            return comments;
        })
    }
}