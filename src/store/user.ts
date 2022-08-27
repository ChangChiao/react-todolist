import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
type User = {
  email: string;
  nickname: string;
};

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const userState = atom({
  key: "user",
  default: {} as Partial<User>,
  effects_UNSTABLE: [persistAtom],
});
