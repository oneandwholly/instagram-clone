import axios from 'axios';

import photos from '../photos';
import home from '../home';
import cards from '../cards';

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
          cb();
        })
    }
  }
