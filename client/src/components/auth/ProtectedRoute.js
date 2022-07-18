import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
