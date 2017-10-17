import * as h from './actionTypes';

const initialState = {
    cards: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case h.ADD_CARDS:
      return { cards: [ ...action.payload, ...state.cards ]};
    case 'auth/LOG_OUT':
      return initialState;
    default:
      return state;
  }
}
