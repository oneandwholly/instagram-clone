import * as h from './actionTypes';

const initialState = {
    cards: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case h.ADD_CARDS:
      return { cards: [ ...action.payload, ...state.cards ]};
    default:
      return state;
  }
}
