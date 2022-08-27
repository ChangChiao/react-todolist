import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo_lg.png";
import { userSignOut } from "../utils/api/user";
const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const signOut = async () => {
    await userSignOut();
    localStorage.removeItem("token");
    setUser({});
    navigate("/signIn");
  };
  return (
    <header className="flex items-center justify-between h-20 px-8">
      <img src={logo} alt="logo" />
      <div>
        <span>{user?.nickname}</span>的代辦
        <button className="ml-8 hover:text-gray-700" onClick={signOut}>
          登出
        </button>
      </div>
    </header>
  );
};

export default Header;
