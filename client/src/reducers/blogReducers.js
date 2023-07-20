import actionTypes from '../utils/constants';

export const blogReducers = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_BLOGS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.GET_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_ALL_BLOGS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getBlogsStart = () => {
  return { type: actionTypes.GET_ALL_BLOGS_PENDING };
};

export const getBlogsSuccess = (blogs) => {
  return { type: actionTypes.GET_ALL_BLOGS_SUCCESS, payload: blogs };
};

export const getBlogsFailed = (error) => {
  return { type: actionTypes.GET_ALL_BLOGS_FAILED, payload: error };
};
