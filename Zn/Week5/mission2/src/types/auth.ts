import { type CommonResponse } from "./common.ts";

/**
 * 🟩 회원가입 요청 DTO
 */
export type RequestSignupDto = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
};

/**
 * 🟩 회원가입 응답 DTO
 * 서버가 CommonResponse 형태로 반환한다면 data 안에 유저 정보가 들어간다.
 */
export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string; // ✅ Date 대신 string (실제 API는 문자열로 전달됨)
  updatedAt: string;
}>;

/**
 * 🟦 로그인 요청 DTO
 */
export type RequestSigninDto = {
  email: string;
  password: string;
};

/**
 * 🟦 로그인 응답 DTO
 */
export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

/**
 * 🟧 로그인 입력 폼 타입 (useForm 제네릭용)
 */
export type UserSigninInformation = {
  email: string;
  password: string;
};

/**
 * 🟨 내 정보 조회 DTO
 */
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}>;
