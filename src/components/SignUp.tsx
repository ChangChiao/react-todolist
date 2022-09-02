import { useEffect } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { userSignUp } from "../utils/api/user";
import { BASE_URL } from "../config";
import { userState } from "../store/user";

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  confirmPwd: string;
};
const validationSchema = Yup.object().shape({
  email: Yup.string().required("信箱為必填").email("信箱格式無效"),
  nickname: Yup.string().required("暱稱為必填").max(10, "暱稱不可超過10個字元"),
  password: Yup.string().required("密碼為必填"),
  // .min(8, "密碼至少為8個字元")
  // .max(16, "密碼不可超過16個字元"),
  confirmPwd: Yup.string()
    .required("確認密碼為必填")
    .oneOf([Yup.ref("password"), null], "兩次輸入密碼不一致"),
});

type SignUpParams = {
  setTab: (val: number) => void;
};

const SignUp = ({ setTab }: SignUpParams) => {
  const [user, setUser] = useRecoilState(userState);
  console.log("user", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const { email, nickname, password } = data;
    const param = {
      user: {
        email,
        nickname,
        password,
      },
    };
    const { message, error } = await userSignUp(param);
    if (message) {
      toast("註冊成功");
      setTab(0);
    }
    error && toast("註冊失敗");
  };
  useEffect(() => {
    setUser({});
  }, []);
  return (
    <div className="pt-2">
      <h1 className="title">註冊帳號</h1>
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
        <label htmlFor="nickname">暱稱</label>
        <input
          id="nickname"
          className="field"
          {...register("nickname")}
          placeholder="請輸入暱稱"
        />
        {errors.nickname?.message && (
          <span className="error">{errors.nickname?.message}</span>
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
        <label htmlFor="confirmPwd">再次輸入密碼</label>
        <input
          className="field"
          type="password"
          id="confirmPwd"
          {...register("confirmPwd")}
          placeholder="請再次輸入密碼"
        />
        {errors.confirmPwd?.message && (
          <span className="error">{errors.confirmPwd?.message}</span>
        )}
        <button className="mt-4 btn" type="submit">
          註冊帳號
        </button>
        <button className="mt-6" onClick={() => setTab(0)}>
          登入
        </button>
      </form>
    </div>
  );
};

export default SignUp;
