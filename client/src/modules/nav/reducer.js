import * as n from './actionTypes';

const initialState = {
    visibility: {
        topNav: true,
        bottomNav: true,
        options: false,
        more: false,
        mainContent: true
    },
    active: 'home'
}

export default (state = initialState, action) => {
    switch(action.type) {
      case n.HIDE_OPTIONS:
          return { ...state, visibility: { ...state.visibility, options: false }};
      case n.SHOW_OPTIONS:
          return { ...state, visibility: { ...state.visibility, options: true }};
      case n.HIDE_MAIN:
          return { ...state, visibility: { ...state.visibility, mainContent: false }};
      case n.SHOW_MAIN:
          return { ...state, visibility: { ...state.visibility, mainContent: true }};
        case n.HIDE_TOP:
            return { ...state, visibility: { ...state.visibility, topNav: false }};
        case n.SHOW_TOP:
            return { ...state, visibility: { ...state.visibility, topNav: true }};
        case n.HIDE_BOTTOM:
            return { ...state, visibility: { ...state.visibility, bottomNav: false }};
        case n.SHOW_BOTTOM:
            return { ...state, visibility: { ...state.visibility, bottomNav: true }};
        case n.SET_ACTIVE:
            return { ...state, active: action.payload };
        case 'auth/LOG_OUT':
            return initialState;
        default:
            return state;
    }
}
