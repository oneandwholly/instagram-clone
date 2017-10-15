import * as p from './actionTypes';

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
        case p.ADD_ARRAY:
            newById = { ...state.byId };
            action.payload.photos.forEach(photo => {
                newById[photo.id] = photo;
            });
            return newState = { ...state, byId: newById };
        default:
            return state; 
    }
}