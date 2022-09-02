import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { userSignIn } from "../utils/api/user";
import { userState } from "../store/user";

type FormValues = {
  email: string;
  password: string;
};
const validationSchema = Yup.object().shape({
  email: Yup.string().required("信箱為必填").email("信箱格式無效"),
  password: Yup.string().required("密碼為必填"),
  // .min(8, "密碼至少為8個字元")
  // .max(16, "密碼不可超過16個字元"),
});

type SingInParams = {
  setTab: (val: number) => void;
};

const SignIn = ({ setTab }: SingInParams) => {
  const [user, setUser] = useRecoilState(userState);
  console.log("user", user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const { email, password } = data;
    const param = {
      email,
      password,
    };
    const {
      message,
      email: userEmail,
      nickname,
      error,
    } = await userSignIn(param);
    if (message) {
      toast("登入成功");
      navigate("/");
      setUser({ email: userEmail, nickname });
    }
    error && toast("登入失敗");
  };
  useEffect(() => {
    setUser({});
  }, []);
  return (
    <div>
      <h1 className="title">最實用的線上代辦事項服務</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="field"
          {...register("email")}
          placeholder="請輸入email"
        />
        {errors.email?.message && (
          <span className="error">{errors.email?.message}</span>
        )}
        <label htmlFor="password">密碼</label>
        <input
          className="field"
          type="password"
          id="password"
          {...register("password")}
          placeholder="請輸入密碼"
        />
        {errors.password?.message && (
          <span className="error">{errors.password?.message}</span>
        )}
        <button className="mt-6 btn" type="submit">
          登入
        </button>
        <button className="m-auto mt-4" onClick={() => setTab(1)}>
          註冊帳號
        </button>
      </form>
    </div>
  );
};

export default SignIn;
