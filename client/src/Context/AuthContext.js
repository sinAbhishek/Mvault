import { useEffect, createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  search: null,
};

export const AuthContext = createContext(INITIAL_STATE);
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        search: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
        search: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        search: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
        search: action.payload,
      };
    case "SEARCH":
      return {
        user: state.user,
        loading: false,
        error: null,
        search: action.payload,
      };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.user,
        error: state.error,
        search: state.search,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
