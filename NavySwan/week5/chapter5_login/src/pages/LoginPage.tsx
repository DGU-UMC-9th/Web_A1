import useForm from "../hooks/useForm.ts";
import { validateSignin } from "../utils/validate.ts";
import type { UserSigninInformation } from "../utils/validate.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const{login, accessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [navigate, accessToken]);


    const {values, errors, touched, getInputProps} = 
        useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

/*    const isDisabled = 
        Object.values(errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some((value) => value === "");
*/

    // 로그인 버튼 클릭 시 실행되는 함수 (AuthContext의 login 함수와 연동 예정)
    const handleSubmit = async() => {
        try{
            await login(values);
            navigate("/my"); // 로그인 성공 시 마이페이지로 이동
        } catch {
            navigate("/"); // 로그인 실패 시 홈으로 이동
        }

    };

    // 구글 로그인 버튼 클릭 시 실행되는 함수
    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    }


    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"email"}
                    placeholder={"이메일"}
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input
                    {...getInputProps("password")}
                    name="password"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"password"}
                    placeholder={"패스워드"}
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button type="button" onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
                    로그인
                </button>
                // chapter5 3강 관련 수정 (구글 로그인 버튼 추가)
                <button type="button" onClick={handleGoogleLogin} className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
                    <div className = "flex items-center justify-center gap-4">
                        <img src = {'/image/google.png'} alt = "Google Logo Image"/>
                        <span>구글 로그인</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;