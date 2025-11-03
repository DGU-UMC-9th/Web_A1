import { type UserSigninInformation, validateSignin } from '../utils/validate';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: { email: '', password: '' },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    await login(values);
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === '');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[320px] flex flex-col gap-4">
        {/* 헤더 */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            type="button"
            aria-label="홈으로"
            onClick={() => navigate(-1)}
            className="absolute left-0 text-blue-500 hover:text-blue-600 text-2xl font-bold"
          >
            {'<'}
          </button>
          <span className="text-xl font-extrabold text-blue-600">로그인</span>
        </div>

        {/* 이메일 입력 */}
        <div className="flex flex-col gap-1">
          <input
            {...getInputProps('email')}
            className={`border rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 transition-all
              ${
                errors?.email && touched?.email
                  ? 'border-blue-400 bg-blue-50 focus:ring-blue-300'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
            type="email"
            placeholder="이메일"
          />
          {errors?.email && touched?.email && (
            <span className="text-blue-600 text-sm">{errors.email}</span>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className="flex flex-col gap-1">
          <input
            {...getInputProps('password')}
            className={`border rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 transition-all
              ${
                errors?.password && touched?.password
                  ? 'border-blue-400 bg-blue-50 focus:ring-blue-300'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
            type="password"
            placeholder="비밀번호"
          />
          {errors?.password && touched?.password && (
            <span className="text-blue-600 text-sm">{errors.password}</span>
          )}
        </div>

        {/* 로그인 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full mt-2 bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          로그인
        </button>

        {/* 회원가입 링크 */}
        <p className="text-center text-gray-500 text-sm mt-3">
          아직 계정이 없으신가요?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;