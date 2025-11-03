import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

// ✅ 유효성 검사 스키마
const emailSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});
type EmailForm = z.infer<typeof emailSchema>;

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
  })
  .refine((v) => v.password === v.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });
type PasswordForm = z.infer<typeof passwordSchema>;

const nameSchema = z.object({
  name: z.string().min(1, { message: "닉네임을 입력해주세요." }),
});
type NameForm = z.infer<typeof nameSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // ✅ react-hook-form
  const emailForm = useForm<EmailForm>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const pwForm = useForm<PasswordForm>({
    defaultValues: { password: "", passwordCheck: "" },
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const nameForm = useForm<NameForm>({
    defaultValues: { name: "" },
    resolver: zodResolver(nameSchema),
    mode: "onChange",
  });

  // ✅ 단계 이동
  const handleEmailNext = emailForm.handleSubmit(({ email }) => {
    setSavedEmail(email);
    setStep(2);
  });

  const handlePwNext = pwForm.handleSubmit(({ password }) => {
    setSavedPassword(password);
    setStep(3);
  });

  const handleFinish = nameForm.handleSubmit(async ({ name }) => {
    await postSignup({ name, email: savedEmail, password: savedPassword });
    navigate("/"); // 홈으로 이동
  });

  // ✅ 상단 헤더
  const Header = (
    <div className="flex items-center justify-center relative w-[300px] mx-auto mb-8">
      {step > 1 && (
        <button
          type="button"
          aria-label="뒤로"
          onClick={() => setStep((s) => (s === 2 ? 1 : 2))}
          className="absolute left-0 text-blue-500 hover:text-blue-600 text-2xl font-bold"
        >
          {"❮"}
        </button>
      )}
      <span className="text-2xl font-extrabold text-blue-600">회원가입</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600">
      <div className="bg-white w-[360px] rounded-3xl shadow-lg px-8 py-10 flex flex-col items-center">
        {Header}

        {/* ✅ 1단계: 이메일 입력 */}
        {step === 1 && (
          <>
            <input
              {...emailForm.register("email")}
              type="email"
              placeholder="이메일을 입력해주세요"
              className={`w-full border rounded-lg py-3 px-4 text-gray-700 text-base focus:outline-none focus:ring-2 transition-all
                ${
                  emailForm.formState.errors.email
                    ? "border-blue-400 bg-blue-50 focus:ring-blue-300"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
            />
            {emailForm.formState.errors.email && (
              <p className="text-blue-600 text-sm mt-2">
                {emailForm.formState.errors.email.message}
              </p>
            )}
            <button
              type="button"
              onClick={handleEmailNext}
              disabled={!emailForm.formState.isValid}
              className={`w-full mt-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md
                ${
                  emailForm.formState.isValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-white cursor-not-allowed"
                }`}
            >
              다음
            </button>
          </>
        )}

        {/* ✅ 2단계: 비밀번호 입력 */}
        {step === 2 && (
          <>
            <div className="relative w-full">
              <input
                {...pwForm.register("password")}
                type={showPw ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                className={`w-full border rounded-lg py-3 px-4 pr-12 text-gray-700 text-base focus:outline-none focus:ring-2 transition-all
                  ${
                    pwForm.formState.errors.password
                      ? "border-blue-400 bg-blue-50 focus:ring-blue-300"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPw ? "🔒" : "👀"}
              </button>
            </div>

            {pwForm.formState.errors.password && (
              <p className="text-blue-600 text-sm mt-2">
                {pwForm.formState.errors.password.message}
              </p>
            )}

            <div className="relative w-full mt-4">
              <input
                {...pwForm.register("passwordCheck")}
                type={showPw2 ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                className={`w-full border rounded-lg py-3 px-4 pr-12 text-gray-700 text-base focus:outline-none focus:ring-2 transition-all
                  ${
                    pwForm.formState.errors.passwordCheck
                      ? "border-blue-400 bg-blue-50 focus:ring-blue-300"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPw2 ? "🔒" : "👀"}
              </button>
            </div>

            {pwForm.formState.errors.passwordCheck && (
              <p className="text-blue-600 text-sm mt-2">
                {pwForm.formState.errors.passwordCheck.message}
              </p>
            )}

            <button
              type="button"
              onClick={handlePwNext}
              disabled={!pwForm.formState.isValid}
              className={`w-full mt-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md
                ${
                  pwForm.formState.isValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-white cursor-not-allowed"
                }`}
            >
              다음
            </button>
          </>
        )}

        {/* ✅ 3단계: 이미지 + 닉네임 */}
        {step === 3 && (
          <>
            <div className="flex flex-col items-center gap-3 mb-4">
              <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-lg font-semibold shadow-inner">
                IMG
              </div>
              <p className="text-sm text-gray-500">프로필 이미지는 추후 설정 가능합니다.</p>
            </div>

            <input
              {...nameForm.register("name")}
              type="text"
              placeholder="닉네임(이름)을 입력해주세요"
              className={`w-full border rounded-lg py-3 px-4 text-gray-700 text-base focus:outline-none focus:ring-2 transition-all
                ${
                  nameForm.formState.errors.name
                    ? "border-blue-400 bg-blue-50 focus:ring-blue-300"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
            />
            {nameForm.formState.errors.name && (
              <p className="text-blue-600 text-sm mt-2">
                {nameForm.formState.errors.name.message}
              </p>
            )}

            <button
              type="button"
              onClick={handleFinish}
              disabled={!nameForm.formState.isValid}
              className={`w-full mt-6 py-3 rounded-lg text-lg font-semibold transition-all shadow-md
                ${
                  nameForm.formState.isValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-white cursor-not-allowed"
                }`}
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  );
}