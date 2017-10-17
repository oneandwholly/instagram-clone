import * as n from './actionTypes';
import axios from 'axios';

export const deletePhoto = (photoId, username) => {
  return dispatch => {
    dispatch({
      type: 'photos/DELETE',
      payload: { photoId, username }
    })
    const config = {
        headers: { authorization: localStorage.getItem('token')}
    };
    axios.delete(`${window.location.protocol}//${window.location.host}/api/photos/${photoId}`, config)
        .then((res) => {
            console.log(res)
        })
  }
}

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

export const hideMore = () => {
    return (dispatch) => {
        dispatch({
            type: n.HIDE_MORE
        })
    }
}

export const showMore = (photoId, username) => {
    return (dispatch) => {
        dispatch({
            type: n.SHOW_MORE,
            payload: { photoId, username }
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
