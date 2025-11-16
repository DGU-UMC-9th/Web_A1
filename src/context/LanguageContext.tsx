/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

export type LanguageType = 'English' | 'French' | 'Spanish' | 'Korean';

// Context의 타입 정의
interface LanguageContextType {
    language: LanguageType;
    setLanguage: (lang: LanguageType) => void;
}

// Context 생성 (초기값은 undefined로 설정)
export const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

// Context Provider 생성
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<LanguageType>(
        (localStorage.getItem('appLanguage') as LanguageType) || 'English'
    );
    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// CounterProvider.tsx 맨 아래 추가
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(
            'useLanguage는 반드시 LanguageProvider 내부에서 사용되어야 합니다.'
        );
    }
    return context;
};
