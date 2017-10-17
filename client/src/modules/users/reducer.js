import * as u from './actionTypes';

const initialState = {
  byId: { },
  byUsername: { }
};

export default (state = initialState, action) => {
    let newState, newById, newByUsername, newFollowersCount, newUser;
    switch(action.type) {
        case u.ADD:
            newUser = action.payload;
            newById = { ...state.byId, [newUser.id]: newUser };
            newByUsername = { ...state.byUsername, [newUser.username]: newUser.id };
            newState = { ...state, byId: newById, byUsername: newByUsername };
            return newState;
        case 'profiles/UPDATE_FOLLOW_STATUS':
            newUser = state.byId[state.byUsername[action.payload.username]]
            newFollowersCount = newUser.counts.followed_by;
            if (action.payload.followStatus) {
                newFollowersCount+=1;
            } else {
                newFollowersCount-=1;
            }
            newUser = { ...newUser, counts: {...newUser.counts, followed_by: newFollowersCount }};
            newById = { ...state.byId, [newUser.id]: newUser };
            newByUsername = { ...state.byUsername, [newUser.username]: newUser.id };
            newState = { ...state, byId: newById, byUsername: newByUsername };
            return newState;
            case 'auth/LOG_OUT':
                return initialState;

        default:
            return state;
    }
}
