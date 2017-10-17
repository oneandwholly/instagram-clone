import * as p from './actionTypes';
import cards from '../cards';

const initialState = {
    byId: {}
};

export default (state = initialState, action) => {
    let newState, newById;
    switch(action.type) {
        case p.ADD:
            newById = { ...state.byId, [action.payload.id]: action.payload };
            newState = { ...state, byId: newById };
            return newState;
        case 'photos/DELETE':
            newById = { ...state.byId };
            delete newById[action.payload.photoId]
            newState = { ...state, byId: newById };
            return newState;
        case p.ADD_ARRAY:
            newById = { ...state.byId };
            action.payload.photos.forEach(photo => {
                newById[photo.id] = photo;
            });
            return newState = { ...state, byId: newById };
        case cards.actionTypes.UPDATE_LIKE_STATUS:
            if(!(Object.keys(state.byId).length === 0) && state.byId.constructor === Object) {
                let newLikesCount = state.byId[action.payload.photoId].likes.count;
                if (action.payload.likeStatus) {
                    newLikesCount+=1;
                } else {
                    newLikesCount-=1;
                }
                return { ...state, byId: { ...state.byId, [action.payload.photoId]: { ...state.byId[action.payload.photoId], likes: { count: newLikesCount}}}}
            }
            return state;
            case 'auth/LOG_OUT':
                return initialState;
        default:
            return state;
    }
}
