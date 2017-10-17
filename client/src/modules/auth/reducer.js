import * as a from './actionTypes';

const initialState = {
  hasToken: false,
  userId: null,
  error: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case a.LOGIN:
      return { ...state, error: '', hasToken: true };
    case a.LOGOUT:
      return initialState;
    case a.SET_USER_ID:
      return { ...state, userId: action.payload };
    case a.ERROR:
      return { ...state, error: action.payload };
    case 'auth/SET_HAS_TOKEN_TO_FALSE':
      return { ...state, hasToken: false }
    case 'auth/LOG_OUT':
      return initialState;
    default:
      return state;
    }
}
