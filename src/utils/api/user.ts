import { BASE_URL } from "../../config";
import service from "./axiosConfig";
import { getAuthorizationHeader } from "./header";

const USER_PATH = `${BASE_URL}/users`;

interface SignInParam {
  email: string;
  password: string;
}

interface SignUpParam {
  email: string;
  password: string;
  nickname: string;
}

interface APIResponse {
  message: string;
}

interface SignInResponse extends APIResponse {
  email: string;
  nickname: string;
}

interface SignUpResponse extends APIResponse {
  email: string;
  nickname: string;
}

export const userCheck = () => {
  const headers = getAuthorizationHeader();
  return service.post<{}, APIResponse>("/check", { headers });
};

export const userSignIn = (param: SignInParam) => {
  const headers = getAuthorizationHeader();
  return service.post<SignInParam, SignInResponse>(
    `${USER_PATH}/sign_in`,
    param,
    {
      headers,
    }
  );
};

export const userSignUp = (param: SignUpParam) => {
  const headers = getAuthorizationHeader();
  return service.post<SignUpParam, SignUpResponse>(USER_PATH, param, {
    headers,
  });
};

export const userSignOut = () => {
  const headers = getAuthorizationHeader();
  return service.delete<{}, APIResponse>(USER_PATH, {
    headers,
  });
};
