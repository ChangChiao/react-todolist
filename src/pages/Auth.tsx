import Layout from "../layout/Layout";
import { Navigate } from "react-router-dom";
const Auth = () => {
  return localStorage.getItem("token") ? <Layout /> : <Navigate to="signin" />;
};

export default Auth;
