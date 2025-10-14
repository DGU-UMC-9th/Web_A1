import { useState } from "react";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {

    const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accesToken)

    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const isDisabled = 
        Object.values(errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some((value) => value === "");


    const handleSubmit = async() => {
        try {
            const response = await postSignin(values);
            setItem(response.data.accesToken);
        } catch(error){
            alert(error?.message);
        }
    };
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
                <button type="button" onClick={handleSubmit} disabled={isDisabled} className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medum hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
                    로그인
                </button>
            </div>
        </div>
    );
};

export default LoginPage;