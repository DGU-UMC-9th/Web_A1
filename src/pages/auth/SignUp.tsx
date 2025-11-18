import { useForm } from 'react-hook-form';
import AuthInput from '../../components/common/AuthInput';
import Button from '../../components/common/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';
import { signupSchema } from '../../validate/validate';

type SignUpForm = {
    email: string;
    password: string;
    username: string;
    checkbox: boolean;
};

export default function SignUp() {
    const { language } = useLanguage();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignUpForm>({
        defaultValues: {
            email: '',
            password: '',
            username: '',
            checkbox: false,
        },
        mode: 'onChange',
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (data: SignUpForm) => {
        const submitData = {
            email: data.email,
            password: data.password,
            username: data.username,
        };
        console.log(submitData);
    };

    return (
        <div className="flex flex-col w-full h-fit gap-[30px] max-h-[75dvh]">
            <div className="flex flex-col items-center justify-center gap-[15px]">
                <h1 className="title-32 text-dark-gray-500">
                    {languageCopy[language].SignUp.title}
                </h1>
                <h4 className="title-18 text-dark-gray-500 opacity-80 text-nowrap">
                    {languageCopy[language].SignUp.subtitle}
                </h4>
            </div>
            <form
                className="flex flex-col gap-[14px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <AuthInput
                    type="email"
                    placeholder={languageCopy[language].SignUp.emailPlaceholder}
                    category={languageCopy[language].SignUp.email}
                    {...register('email')}
                />
                <AuthInput
                    type="text"
                    placeholder={
                        languageCopy[language].SignUp.usernamePlaceholder
                    }
                    category={languageCopy[language].SignUp.username}
                    {...register('username')}
                />
                <AuthInput
                    type="password"
                    placeholder={
                        languageCopy[language].SignUp.passwordPlaceholder
                    }
                    category={languageCopy[language].SignUp.password}
                    {...register('password')}
                />

                <div className="flex gap-[12px]">
                    <input type="checkbox" {...register('checkbox')} />
                    <span className="text-dark-gray-500 body-18 opacity-80">
                        {languageCopy[language].SignUp.terms}
                    </span>
                </div>
                <Button
                    type="submit"
                    btnType="big"
                    btnName={languageCopy[language].SignUp.signUp}
                    onClick={handleSubmit(onSubmit)}
                    error={
                        errors.email || errors.password || errors.username
                            ? true
                            : false
                    }
                    isValid={isValid}
                />
            </form>
            <div className="flex items-center gap-[8px] justify-center">
                <span className="text-dark-gray-500 opacity-65 body-18">
                    {languageCopy[language].SignUp.haveAccount}
                </span>
                <a className="text-primary-300 title-18" href="/auth/login">
                    {languageCopy[language].SignUp.login}
                </a>
            </div>
        </div>
    );
}
