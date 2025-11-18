import AuthInput from '../../components/common/AuthInput';
import Button from '../../components/common/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';
import { loginSchema } from '../../validate/validate';

type LoginForm = {
    email: string;
    password: string;
};

export default function Login() {
    const { language } = useLanguage();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginForm) => {
        const submitData = {
            email: data.email,
            password: data.password,
        };
        console.log(submitData);
    };
    return (
        <div className="flex flex-col w-fit h-fit gap-[37px]">
            <div className="flex flex-col items-center justify-center gap-[15px]">
                <h1 className="title-32 text-dark-gray-500">
                    {languageCopy[language].Login.title}
                </h1>
                <h4 className="flex text-center title-18 text-dark-gray-500 opacity-80">
                    {languageCopy[language].Login.subtitle}
                </h4>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[14px] w-full"
            >
                <AuthInput
                    type="email"
                    placeholder={languageCopy[language].Login.emailPlaceholder}
                    category={languageCopy[language].Login.email}
                    {...register('email')}
                />
                <AuthInput
                    type="password"
                    placeholder={
                        languageCopy[language].Login.passwordPlaceholder
                    }
                    category={languageCopy[language].Login.password}
                    agree={true}
                    agreeMent={languageCopy[language].Login.rememberPassword}
                    sub={languageCopy[language].Login.forgotPassword}
                    subLink="/auth/login"
                    {...register('password')}
                />
                <Button
                    type="submit"
                    btnType="big"
                    btnName={languageCopy[language].Login.signIn}
                    isValid={isValid}
                    error={!!(errors.email || errors.password)}
                    onClick={handleSubmit(onSubmit)}
                />
            </form>
            <div className="flex items-center gap-[8px] justify-center">
                <span className="text-dark-gray-500 opacity-65 body-18">
                    {languageCopy[language].Login.noAccount}
                </span>
                <a className="text-primary-300 title-18" href="/auth/signup">
                    {languageCopy[language].Login.createAccount}
                </a>
            </div>
        </div>
    );
}
