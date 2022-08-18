import { atom } from "recoil";

type User = {
  email: string;
  nickname: string;
};

export const userState = atom({
  key: "user",
  default: {} as Partial<User>,
});
