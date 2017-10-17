import axios from 'axios';
import photos from '../photos';
import cards from '../cards';
import * as h from './actionTypes';

export const fetchHomeFeed = () => {
    return (dispatch) => {
      const config = {
          headers: { authorization: localStorage.getItem('token')}
      };
      axios.get(`${window.location.protocol}//${window.location.host}/api/users/self/homefeed`, config)
      .then(res => {
          dispatch(photos.actions.addPhotos(res.data))

          res.data.photos.forEach(photo => {
            dispatch(cards.actions.getCard(photo.id))
          })

          const photoIds = res.data.photos.map(photo => photo.id);
          dispatch({
            type: h.ADD_CARDS,
            payload: photoIds
          })
      })
    }
}
