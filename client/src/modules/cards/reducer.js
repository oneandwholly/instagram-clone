import * as c from './actionTypes';

const initialState = {
  
};

export default (state = initialState, action) => {
  switch(action.type) {
    case c.ADD_PHOTO:
        return {...state, [action.payload.photoId]: { ...state[action.payload.photoId], photoId: action.payload.photoId } }
    case c.ADD_COMMENTS: 
        return {...state, [action.payload.photoId]: { ...state[action.payload.photoId], comments: action.payload.comments } }
    case c.FETCH_LIKE_STATUS:
        return {...state, [action.payload.photoId]: { ...state[action.payload.photoId], likeStatus: action.payload.likeStatus } }
    case c.UPDATE_LIKE_STATUS:
        return {...state, [action.payload.photoId]: { ...state[action.payload.photoId], likeStatus: action.payload.likeStatus } }
    case c.ADD_COMMENT:
        return {...state, [action.payload.photoId]: { ...state[action.payload.photoId], comments: [ ...state[action.payload.photoId].comments, action.payload.comment ]}}
    default:
      return state;
    }
}