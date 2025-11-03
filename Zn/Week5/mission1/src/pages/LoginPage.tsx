import useForm from "../hooks/useForm";
import type { UserSignInInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } =
  useForm<UserSignInInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    await login(values);
  };

  const isDisabled: boolean =
    Object.values(errors || {}).some(
      (error) => typeof error === "string" && error.length > 0
    ) || Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-[300px] p-[10px] rounded-sm text-white ${
            isDisabled ? "bg-gray-400" : "bg-[#807bff] hover:bg-[#6f6de3]"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
