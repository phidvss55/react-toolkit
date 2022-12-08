import { useEffect } from "react";
import { createContext, useReducer } from "react"
import { AUTH_CONTEXT_TYPE } from "../constants";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
  switch(action.type) {
    case AUTH_CONTEXT_TYPE.LOGIN_START: 
      return {
        user: null,
        loading: true,
        error: null
      };
    case AUTH_CONTEXT_TYPE.LOGIN_FAILURE: 
      return {
        user: null,
        loading: false,
        error: action.payload
      };
    case AUTH_CONTEXT_TYPE.LOGIN_SUCCESS: 
      return {
        user: action.payload,
        loading: false,
        error: null
      }
    case AUTH_CONTEXT_TYPE.LOGOUT: 
      return INITIAL_STATE
    default: 
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))   
  }, [state.user])
  
  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: state.error, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
