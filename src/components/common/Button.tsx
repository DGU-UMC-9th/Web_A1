type TButtonType = 'big' | 'medium' | 'small';

type TButtonProps = {
    btnType: TButtonType;
    btnName: string;
    onClick: () => void;
    type: 'button' | 'submit' | 'reset';
    error?: boolean;
    isValid?: boolean;
    style?: string;
};

export default function Button({
    btnType,
    btnName,
    onClick,
    type,
    error = false,
    isValid = true,
    style,
}: TButtonProps) {
    const bigStyle = 'title-18 py-[16px] rounded-[12px] px-[32px]';
    const mediumStyle = 'title-16 py-[12px] rounded-[10px]';
    const smallStyle = 'title-12 py-[9px] rounded-[6px]';
    const isDisabled = error || isValid === false;

    return (
        <button
            type={type}
            className={`flex h-fit justify-center items-center text-white opacity-90 bg-primary-500 ${
                btnType === 'big'
                    ? bigStyle
                    : btnType === 'medium'
                    ? mediumStyle
                    : smallStyle
            } ${isDisabled ? 'bg-gray-200 cursor-not-allowed' : ''} 
            ${style ? style : ''}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {btnName}
        </button>
    );
}
