import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth"; // 회원가입 API
import { useNavigate } from "react-router-dom"; // 페이지 이동용 훅

// Zod 유효성 검사
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
  const navigate = useNavigate(); // navigate 훅 선언

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // 회원가입 처리 함수
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await postSignup({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: "",
      });

      console.log("회원가입 성공:", response);

      // 회원가입 성공 시 홈("/")으로 이동
      navigate("/");
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      alert(error?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3 w-[300px]">
        {/* 이메일 입력 */}
        <input
          {...register("email")}
          className={`border p-[10px] rounded-sm ${
            errors.email ? "border-red-500 bg-red-200" : "border-gray-300"
          } focus:border-[#8b7bff]`}
          type="email"
          placeholder="이메일"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        {/* 비밀번호 입력 */}
        <input
          {...register("password")}
          className={`border p-[10px] rounded-sm ${
            errors.password ? "border-red-500 bg-red-200" : "border-gray-300"
          } focus:border-[#8b7bff]`}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}

        {/* 비밀번호 확인 */}
        <input
          {...register("passwordCheck")}
          className={`border p-[10px] rounded-sm ${
            errors.passwordCheck
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          } focus:border-[#8b7bff]`}
          type="password"
          placeholder="비밀번호 확인"
        />
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

        {/* 이름 입력 */}
        <input
          {...register("name")}
          className={`border p-[10px] rounded-sm ${
            errors.name ? "border-red-500 bg-red-200" : "border-gray-300"
          } focus:border-[#8b7bff]`}
          type="text"
          placeholder="이름"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        {/* 회원가입 버튼 */}
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-[#8b7bff] text-white py-2 rounded-sm hover:bg-[#7a6de0] transition-colors disabled:bg-gray-300"
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
