// import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { actions } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(actions.loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(actions.loginSuccess(res.data));
  } catch (err) {
    dispatch(actions.loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(actions.registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(actions.registerSuccess(res.data));
  } catch (err) {
    dispatch(actions.registerFailure());
  }
};
