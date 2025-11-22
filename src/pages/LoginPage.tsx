import useForm from "../hooks/useForm";
import { validateSignin } from "../utils/validate.ts";
import type { UserSigninInformation } from "../utils/validate.ts";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 로그인 전 접근 경로 받기
  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    if (accessToken) {
      // ✅ 이미 로그인 상태라면 원래 경로로 복귀
      navigate(from, { replace: true });
    }
  }, [navigate, accessToken, from]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  const handleSubmit = async () => {
    try {
      await login(values);
      // ✅ 로그인 성공 후, 이전 페이지로 복귀
      navigate(from, { replace: true });
    } catch {
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
            ${
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
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-gray-300"
            }`}
          type="password"
          placeholder="패스워드"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer 
            ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#ff4cc4] hover:bg-[#ff4cc4]"
            }`}
        >
          로그인
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-[#ff4cc4] text-white py-3 rounded-md text-lg font-medium hover:bg-[#ff4cc4] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-7 h-7">
              <img src={"/images/google.png"} alt="Google Logo" />
            </div>
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};