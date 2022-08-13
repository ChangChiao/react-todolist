import { BASE_URL } from "../../config";
import service from "./axiosConfig";
import { getAuthorizationHeader } from "./header";

const TODO_PATH = `${BASE_URL}/task`;

export const getAllTask = (param: {}) => {
  const headers = getAuthorizationHeader();
  let path = `${TODO_PATH}`;
  return service.get<{}, {}>(path, param, { headers });
};
