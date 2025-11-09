import useForm from "../hooks/useForm";
import { validateSignin } from "../utils/validate";
import type { UserSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 보호 라우트에서 넘어온 경로
  const from = (location.state as { from?: string })?.from || "/";

  // ✅ 이미 로그인 상태라면 원래 가야 할 곳으로 보내기
  useEffect(() => {
    if (accessToken) {
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
      // ✅ 일반 로그인은 state.from만 이용
      navigate(from, { replace: true });
    } catch {
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  const handleGoogleLogin = () => {
    // ✅ 구글 로그인은 redirectPath를 localStorage에 저장 (SPA state 날아가니까)
    const redirectPath = from || "/";
    localStorage.setItem("redirectPath", redirectPath);

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

export default LoginPage;
