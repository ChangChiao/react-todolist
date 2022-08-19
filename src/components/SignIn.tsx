import { useEffect } from "react";
import { toast } from "react-toastify";
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
  password: Yup.string()
    .required("密碼為必填")
    .min(8, "密碼至少為8個字元")
    .max(16, "密碼不可超過16個字元"),
});

const SignIn = () => {
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
    const { email, password } = data;
    const param = {
      email,
      password,
    };
    const { message, error } = await userSignIn(param);
    message && toast("登入成功");
    error && toast("登入失敗");
  };
  useEffect(() => {
    setUser({});
  }, []);
  return (
    <div className="pt-2">
      <h1>登入</h1>
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
        <input className="mt-2 btn" value="登入" type="submit" />
      </form>
      <button>註冊帳號</button>
    </div>
  );
};

export default SignIn;
