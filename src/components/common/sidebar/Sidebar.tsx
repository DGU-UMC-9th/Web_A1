import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo/logo.svg?react';
import Hamburger from '../../../assets/Navigation/hamburger.svg?react';

import { PAGES, FOOTER, MAIN } from '../../../constants/menus';
import { useLanguage } from '../../../context/LanguageContext';
import { languageCopy } from '../../../local';
import SidebarTab from './SidebarTab';

type TSidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
};

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}: TSidebarProps) {
    const { language } = useLanguage();
    const navigate = useNavigate();
    return (
        <aside
            className={`py-[24px] max-h-screen overflow-y-hidden w-[240px] flex-col items-stretch gap-[10px] h-full bg-white lg:flex ${
                sidebarOpen ? 'absolute lg:relative flex z-10' : 'hidden'
            }`}
        >
            <div className="px-6 flex items-center justify-center mb-[19px]">
                <Hamburger
                    className="absolute text-gray-600 z-[100] top-[28.5px] left-[30px] lg:hidden"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                />
                <Logo
                    className="block mt-[3px] hover:cursor-pointer"
                    onClick={() => navigate('/')}
                ></Logo>
            </div>

            <div className="flex flex-col overflow-y-auto">
                <section className="flex flex-col">
                    {MAIN.map(({ label, to, icon, translationKey }) => (
                        <SidebarTab
                            key={label}
                            to={to}
                            icon={icon}
                            tabName={
                                languageCopy[language].Sidebar[
                                    translationKey
                                ] ?? label
                            }
                        />
                    ))}
                </section>

                <hr className="my-2 border-gray-100" />

                <section className="flex flex-col ">
                    <span className="px-[30px] py-3 text-dark-gray-500 text-xs tracking-wide opacity-60">
                        PAGES
                    </span>
                    {PAGES.map(({ label, to, icon, translationKey }) => (
                        <SidebarTab
                            key={label}
                            to={to}
                            icon={icon}
                            tabName={
                                languageCopy[language].Sidebar[
                                    translationKey
                                ] ?? label
                            }
                        />
                    ))}
                </section>

                <hr className="my-2 border-gray-100" />

                <section className="flex flex-col mt-auto">
                    {FOOTER.map(({ label, to, icon, translationKey }) => (
                        <SidebarTab
                            key={label}
                            to={to}
                            icon={icon}
                            tabName={
                                languageCopy[language].Sidebar[
                                    translationKey
                                ] ?? label
                            }
                        />
                    ))}
                </section>
            </div>
        </aside>
    );
}
