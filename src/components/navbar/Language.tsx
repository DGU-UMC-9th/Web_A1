import { useEffect, useRef, useState } from 'react';
import UK from '../../assets/Flag/UK.svg?react';
import FR from '../../assets/Flag/French.svg?react';
import SP from '../../assets/Flag/Spanish.svg?react';
import KR from '../../assets/Flag/KR.svg?react';
import { type LanguageType, useLanguage } from '../../context/LanguageContext';
import Check from '../../assets/Navigation/check.svg?react';
import Dropdown from '../../assets/Navigation/dropdown.svg?react';

const LANGUAGE_OPTIONS: LanguageType[] = [
    'English',
    'French',
    'Spanish',
    'Korean',
];
const LANGUAGE_ICONS: Record<LanguageType, typeof UK> = {
    English: UK,
    French: FR,
    Spanish: SP,
    Korean: KR,
};

export default function Language() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const SelectedLanguageIcon = LANGUAGE_ICONS[language];

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current?.contains(event.target as Node)) {
                return;
            }

            setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (option: LanguageType) => {
        setLanguage(option);
    };

    return (
        <div ref={dropdownRef} className="relative hidden sm:flex">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-[8px] w-[123px]"
            >
                {SelectedLanguageIcon && (
                    <SelectedLanguageIcon className="rounded-[5px] w-[40px]" />
                )}
                <div className="text-gray-600 body-14">{language}</div>
                <Dropdown
                    className={`${isOpen ? 'rotate-180' : ''}`}
                ></Dropdown>
            </button>
            {isOpen && (
                <div className="absolute top-10 mt-2 w-[254px] left-[-70px] bg-white rounded-[14px] shadow-[0px_9px_40px_rgba(0,0,0,0.06)] py-[8px] z-[99]">
                    <h1 className="text-gray-900 body-14 px-[20px] py-[14px]">
                        Select Language
                    </h1>
                    <hr className="stroke-[0.5px] stroke-gray-500 opacity-10" />
                    <div className="flex flex-col">
                        {LANGUAGE_OPTIONS.map((option) => {
                            const OptionIcon = LANGUAGE_ICONS[option];

                            return (
                                <button
                                    type="button"
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className="flex items-center justify-between h-[60px] px-[14px] hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-[8px]">
                                        <OptionIcon className="w-[48px]" />
                                        <div className="flex text-left text-gray-900 body-14">
                                            {option}
                                        </div>
                                    </div>
                                    {option === language && <Check />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
