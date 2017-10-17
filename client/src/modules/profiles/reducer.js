/*
    state.profiles = {
        [username]: {
            userId: 0,
            photoIds: [],
            pageToken:
            followers:
            following:
        }
    }
*/

import * as p from './actionTypes';

const initialState = {
    user: {
        userId: 0,
        photoIds: [],
        pageToken: 1
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case p.ADD:
            return { ...state, [action.payload.username]: action.payload.profile }
        case p.ADD_PHOTOS:
            return {
                ...state,
                [action.payload.username]: {
                    ...state[action.payload.username],
                    photoIds: state[action.payload.username].photoIds.concat(action.payload.photoIds),
                    pageToken: action.payload.pageToken,
                    hasMore: action.payload.hasMore
                }
            }
        case p.FETCH_FOLLOW_STATUS:
            return { ...state, [action.payload.username]: { ...state[action.payload.username], followStatus: action.payload.followStatus}}
        case p.UPDATE_FOLLOW_STATUS:
            return { ...state, [action.payload.username]: { ...state[action.payload.username], followStatus: action.payload.followStatus}}
            case 'auth/LOG_OUT':
                return initialState;
        case 'photos/DELETE':
        if (state[action.payload.username]) {
          let newPhotoIds = [ ...state[action.payload.username].photoIds ];
          let index = newPhotoIds.indexOf(action.payload.photoId);
          if (index > -1) {
            newPhotoIds.splice(index, 1);
          }
          let newState = {...state, [action.payload.username]: {...state[action.payload.username], photoIds: newPhotoIds} } ;
          return newState

        }
        return state;
        default:
            return state;
    }
}
