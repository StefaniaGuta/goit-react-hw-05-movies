import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({component: Component, redirectTo="/"}) => {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const isRefresh = useSelector((state) => state.auth.isRefreshing);
  
  const shouldRedirect = !isLogin && !isRefresh;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
}

export default PrivateRoute;