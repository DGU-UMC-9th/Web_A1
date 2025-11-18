import { useNavigate } from 'react-router-dom';

type TAuthInputProps = {
    type: string;
    placeholder: string;
    category: string;
    sub?: string;
    subLink?: string;
    agree?: boolean;
    agreeMent?: string;
};

export default function AuthInput({
    type,
    placeholder,
    category,
    sub,
    subLink,
    agree,
    agreeMent,
    ...register
}: TAuthInputProps) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-[8px] items-start justify-center">
            <div className="flex justify-between w-full">
                <span className="text-dark-gray-500 title-18">{category}</span>
                {sub && subLink && (
                    <span
                        className="text-dark-gray-500 opacity-60 title-14 ml-[8px] cursor-pointer"
                        onClick={() => navigate(subLink)}
                    >
                        {sub}
                    </span>
                )}
            </div>

            <input
                type={type}
                placeholder={placeholder}
                {...register}
                className="w-full px-[16px] py-[15px] border-[1px] border-gray-200 bg-gray-50 rounded-[8px] text-gray-400 body-18"
            />

            {agree && agreeMent && (
                <div className="flex items-center gap-[12px]">
                    <input type="checkbox" className="w-[12px] h-[12px]" />
                    <span className="text-dark-gray-500 body-18 opacity-60">
                        {agreeMent}
                    </span>
                </div>
            )}
        </div>
    );
}
