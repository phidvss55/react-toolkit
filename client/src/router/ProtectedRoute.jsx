import React from "react";
import { TOKEN_KEY } from "../utils/constant";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  console.log(localStorage.getItem(TOKEN_KEY));
  if (!localStorage.getItem(TOKEN_KEY)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
