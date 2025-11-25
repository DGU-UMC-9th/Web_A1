import { NavLink } from 'react-router-dom';

type TSidebarTabProps = {
    to: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    tabName: string;
};

export default function SidebarTab({
    tabName,
    to,
    icon: Icon,
}: TSidebarTabProps) {
    return (
        <NavLink to={to} className="relative w-full flex px-[24px]">
            {({ isActive }) => (
                <button
                    className={`flex w-full items-center h-[50px] rounded-[6px] px-[40px] body-14
                    ${
                        isActive
                            ? 'bg-primary-500 text-white'
                            : 'text-dark-gray-500'
                    }
                            `}
                >
                    <Icon className="w-[16px] h-[16px] absolute left-[40px]" />
                    <span className="self-center body-14 w-fit text-nowrap">
                        {tabName}
                    </span>
                    {isActive && (
                        <div className="bg-primary-500 rounded-[4px] w-[9px] h-full absolute left-[-4.5px]"></div>
                    )}
                </button>
            )}
        </NavLink>
    );
}
