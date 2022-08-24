import { useState } from "react";
import pattern from "../assets/images/img.png";
import logo from "../assets/images/logo_lg.png";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
const Sign = () => {
  const [tab, setTab] = useState<number>(0);
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="flex flex-col items-center justify-center pr-40 text-center">
        <img className="mb-8 max-w-[300px]" src={logo} alt="" />
        <img className="max-w-[400px]" src={pattern} />
      </div>
      <div className="flex items-center justify-center">
        {tab === 0 ? <SignIn setTab={setTab} /> : <SignUp setTab={setTab} />}
      </div>
    </div>
  );
};

export default Sign;
