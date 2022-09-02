import axios from "axios";
import { toast } from "react-toastify";

const service = axios.create({
  baseURL: "",
});

service.interceptors.request.use(
  (config) => {
    console.log("config", config);
    const params = config.data?.params;
    if (!params) {
      return config;
    }
    Object.keys(params).forEach((vo) => {
      if (!params[vo]) delete params[vo];
    });
    return config;
  },
  (error) => {
    return error;
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      const token = response.headers.authorization.replace(/Bearer/, "");
      console.log("token", token);
      localStorage.setItem("token", token);
    }
    console.log("response", response.status);
    return response.data;
  },
  (error) => {
    const { status } = error.response;
    console.log(`error--${status}`, "error");
    console.warn(" error.response", error.response);
    const errorMsg =
      error.response?.data?.error?.[0] ?? error.response?.data?.message;
    if (errorMsg) toast.error(errorMsg);
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(error);
  }
);

export default service;
