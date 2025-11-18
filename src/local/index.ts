import en from './en.json';
import fr from './fr.json';
import sp from './sp.json';
import kr from './kr.json';
import type { LanguageType } from '../context/LanguageContext';

export const languageCopy: Record<LanguageType, typeof en> = {
    English: en,
    French: fr,
    Spanish: sp,
    Korean: kr,
};
