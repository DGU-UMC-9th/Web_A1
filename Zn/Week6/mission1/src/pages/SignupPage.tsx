import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange", // 🔹 변경 시 바로 유효성 검사 반영
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await postSignup({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: "",
      });

      alert("회원가입이 완료되었습니다! 🎉");
      navigate("/");
    } catch (error: any) {
      alert(error?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
      <div className="w-[360px] bg-[#1a1a1a]/90 border border-gray-700 rounded-2xl shadow-2xl p-8 flex flex-col gap-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-center text-pink-400 mb-2">
          회원가입
        </h1>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register("email")}
            className={`bg-gray-800 text-white border p-3 rounded-md text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none ${
              errors.email ? "border-pink-500" : "border-gray-600"
            }`}
            type="email"
            placeholder="이메일"
          />
          {errors.email && (
            <p className="text-pink-400 text-xs">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            className={`bg-gray-800 text-white border p-3 rounded-md text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none ${
              errors.password ? "border-pink-500" : "border-gray-600"
            }`}
            type="password"
            placeholder="비밀번호"
          />
          {errors.password && (
            <p className="text-pink-400 text-xs">{errors.password.message}</p>
          )}

          <input
            {...register("passwordCheck")}
            className={`bg-gray-800 text-white border p-3 rounded-md text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none ${
              errors.passwordCheck ? "border-pink-500" : "border-gray-600"
            }`}
            type="password"
            placeholder="비밀번호 확인"
          />
          {errors.passwordCheck && (
            <p className="text-pink-400 text-xs">
              {errors.passwordCheck.message}
            </p>
          )}

          <input
            {...register("name")}
            className={`bg-gray-800 text-white border p-3 rounded-md text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none ${
              errors.name ? "border-pink-500" : "border-gray-600"
            }`}
            type="text"
            placeholder="이름"
          />
          {errors.name && (
            <p className="text-pink-400 text-xs">{errors.name.message}</p>
          )}

          {/* ✅ 버튼 색상: 유효하면 핑크 / 아니면 회색 */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`mt-2 py-2 rounded-md text-white font-semibold transition-all duration-300 ${
              !isValid || isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 active:scale-95"
            }`}
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="text-gray-400 text-xs hover:text-pink-400 transition mt-2"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
