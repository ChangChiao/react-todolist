import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import { userSignOut } from "../utils/api/user";
const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const signOut = async () => {
    await userSignOut();
    localStorage.removeItem("token");
    setUser({});
  };
  return (
    <header className="flex items-center justify-between h-20 px-2">
      <img src="/assets/images/logo_lg.png" alt="logo" />
      <span>{user?.nickname}</span>的代辦
      <button onClick={signOut}>登出</button>
    </header>
  );
};

export default Header;
