import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({component: Component, navigateTo='/'}) => {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  
  return isLogin ? <Navigate to={navigateTo}/> : Component
}

export default PublicRoute;