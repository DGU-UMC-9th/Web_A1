import useForm from "../hooks/useForm.ts";
import { validateSignin } from "../utils/validate.ts";
import { postSignin } from "../apis/auth.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import type { ResponseSigninDto, UserSigninInformation } from "../types/auth.ts";

const LoginPage = () => {
  // ✅ accessToken 저장용 localStorage 훅
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  // ✅ 커스텀 useForm 훅 사용
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  // ✅ 로그인 요청 함수
  const handleSubmit = async () => {
    console.log(values);
    try {
      const response: ResponseSigninDto = await postSignin(values);

      // ✅ 서버 응답 구조: CommonResponse<{ id, name, accessToken, refreshToken }>
      const { accessToken, name } = response.data;

      if (accessToken) {
        setItem(accessToken);
        console.log("로그인 성공:", name);
      } else {
        alert("AccessToken이 존재하지 않습니다.");
      }
    } catch (error: any) {
      alert(error?.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        {/* 이메일 입력 */}
        <input
          {...getInputProps("email")}
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

        {/* 비밀번호 입력 */}
        <input
          {...getInputProps("password")}
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

        {/* 로그인 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
