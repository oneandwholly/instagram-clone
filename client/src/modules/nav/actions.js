import * as n from './actionTypes';

export const setHasTokenToFalse = () => {
  return dispatch => {
    dispatch({
      type: 'auth/SET_HAS_TOKEN_TO_FALSE'
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'auth/LOG_OUT'
    });
  }
}

export const setActive = (name) => {
    return (dispatch) => {
        dispatch({
            type: n.SET_ACTIVE,
            payload: name
        })
    }
}

export const hideMain = () => {
    return (dispatch) => {
        dispatch({
            type: n.HIDE_MAIN
        })
    }
}

export const showMain = () => {
    return (dispatch) => {
        dispatch({
            type: n.SHOW_MAIN
        })
    }
}

export const hideOptions = () => {
    return (dispatch) => {
        dispatch({
            type: n.HIDE_OPTIONS
        })
    }
}

export const showOptions = () => {
    return (dispatch) => {
        dispatch({
            type: n.SHOW_OPTIONS
        })
    }
}

export const hideTopNav = () => {
    return (dispatch) => {
        dispatch({
            type: n.HIDE_TOP
        })
    }
}

export const showTopNav = () => {
    return (dispatch) => {
        dispatch({
            type: n.SHOW_TOP
        })
    }
}

export const hideBottomNav = () => {
    return (dispatch) => {
        dispatch({
            type: n.HIDE_BOTTOM
        })
    }
}

export const showBottomNav = () => {
    return (dispatch) => {
        dispatch({
            type: n.SHOW_BOTTOM
        })
    }
}
