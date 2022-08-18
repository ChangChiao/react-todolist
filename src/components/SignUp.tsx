import { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import * as Yup from "yup";

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
  password: Yup.string()
    .required("密碼為必填")
    .min(8, "密碼至少為8個字元")
    .max(16, "密碼不可超過16個字元"),
  confirmPwd: Yup.string()
    .required("確認密碼為必填")
    .oneOf([Yup.ref("password"), null], "兩次輸入密碼不一致"),
});

const SignIn = () => {
  const [user, setUser] = useRecoilState(userState);
  console.log("user", user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  useEffect(() => {
    setUser({});
    const saveEmail = localStorage.getItem("email");
    if (saveEmail) {
      reset({
        email: saveEmail,
      });
    }
  }, []);
  return (
    <div className="pt-2">
      <h2>註冊帳號</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="field"
          {...register("email")}
          placeholder="請輸入email"
        />
        {errors.email?.message && (
          <span className="text-sm text-red-500">{errors.email?.message}</span>
        )}
        <label htmlFor="nickname">暱稱</label>
        <input
          id="nickname"
          className="field"
          {...register("nickname")}
          placeholder="請輸入暱稱"
        />
        {errors.nickname?.message && (
          <span className="text-sm text-red-500">
            {errors.nickname?.message}
          </span>
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
          <span className="text-sm text-red-500">
            {errors.password?.message}
          </span>
        )}
        <label htmlFor="confirmPwd">再次輸入密碼</label>
        <input
          className="field"
          type="confirmPwd"
          id="confirmPwd"
          {...register("confirmPwd")}
          placeholder="請再次輸入密碼"
        />
        {errors.confirmPwd?.message && (
          <span className="text-sm text-red-500">
            {errors.confirmPwd?.message}
          </span>
        )}
        <input className="mt-2 btn" value="註冊帳號" type="submit" />
      </form>
      <button>登入</button>
    </div>
  );
};

export default SignIn;
