import Hamburger from '../../assets/Navigation/hamburger.svg?react';

import Notification from '../navbar/Notification';
import Language from '../navbar/Language';
import Profile from '../navbar/Profile';
import Search from '../../assets/Navigation/search.svg?react';
import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';

type TNavbarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (sidebarOpen: boolean) => void;
};

export default function Navbar({ sidebarOpen, setSidebarOpen }: TNavbarProps) {
    const { language } = useLanguage();
    return (
        <div className="flex h-[70px] items-center justify-between w-full px-[30px] sm:gap-[30px] bg-white">
            <div className="flex items-center gap-[30px]">
                <Hamburger
                    className="text-gray-600 lg:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                />
                <div className="relative">
                    <input
                        type="text"
                        className="sm:w-[35vw] w-[50vw] h-[38px] px-[40px] body-14 text-dark-gray-500/50 bg-white border border-gray-200 rounded-[19px]"
                        placeholder={languageCopy[language].Nav.search}
                    />
                    <Search className="absolute top-[10px] left-[14px] opacity-50" />
                </div>
            </div>
            <div className="items-center gap-[25px] flex">
                <Notification></Notification>
                <Language></Language>
                <Profile></Profile>
            </div>
        </div>
    );
}
