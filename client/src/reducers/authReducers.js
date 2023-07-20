import actionTypes from '../utils/constants';

export const authReducers = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const loginStart = (formData) => {
  return {
    type: actionTypes.LOGIN_START,
    payload: formData,
  };
};

export const loginSuccess = (user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
