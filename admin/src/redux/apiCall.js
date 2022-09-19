import { actions as userActions } from "./userRedux.js";
import { actions as productActions } from "./productRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(userActions.loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(userActions.loginSuccess(res.data));
  } catch (err) {
    dispatch(userActions.loginFailure());
  }
};

export const logout = (dispatch) => {
  dispatch(userActions.logout());
};

export const getProducts = async (dispatch) => {
  dispatch(productActions.getProductStart);
  try {
    const res = await publicRequest.get("/products");
    dispatch(productActions.getProductSuccess(res.data?.data));
  } catch (err) {
    dispatch(productActions.getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(productActions.deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(productActions.deleteProductSuccess(id));
  } catch (err) {
    dispatch(productActions.deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(productActions.updateProductStart());
  try {
    // update
    dispatch(productActions.updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(productActions.updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(productActions.addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(productActions.addProductSuccess(res.data));
  } catch (err) {
    dispatch(productActions.addProductFailure());
  }
};
