import * as h from './actionTypes';

const initialState = {
    cards: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case h.ADD_CARDS:
      return { cards: [ ...action.payload, ...state.cards ]};
    case 'home/ADD':
      return { cards: [ action.payload, ...state.cards]}
    case 'photos/DELETE':
      let index = state.cards.indexOf(action.payload.photoId);
      if (index > -1) {
        let newArray = [ ...state.cards];
        newArray.splice(index, 1)
        return { cards: newArray }
      }
      return state;
      break;
    case 'auth/LOG_OUT':
      return initialState;
    default:
      return state;
  }
}
