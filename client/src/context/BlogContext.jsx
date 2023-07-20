import { createContext, useReducer } from 'react';
import { blogReducers } from '../reducers/blogReducers';

const INITIAL_STATE = {
  blogs: [],
  categories: [],
  selectedCategory: [],
  loading: true,
  error: null,
};

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducers, INITIAL_STATE);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
