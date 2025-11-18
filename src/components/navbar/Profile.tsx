import { useEffect, useRef, useState } from 'react';
import More from '../../assets/Navigation/more.svg?react';
import ManageAccount from '../../assets/Navigation/manage_account.svg?react';
import Logout from '../../assets/Navigation/profileLogout.svg?react';
import ChangePassword from '../../assets/Navigation/changeAccount.svg?react';
import ActivityLog from '../../assets/Navigation/activityLog.svg?react';

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    return (
        <div
            className="flex gap-[8px] items-center relative hover:cursor-pointer"
            ref={dropdownRef}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="bg-gray-800 rounded-full min-w-[44px] max-w-[44px] min-h-[44px] max-h-[44px]"></div>
            <div className="flex-col hidden sm:flex">
                <div className="text-gray-900 title-14 text-nowrap">
                    Moni Roy
                </div>
                <div className="text-gray-800 body-14">Admin</div>
            </div>
            <More className={`${isOpen ? 'rotate-180' : ''}`} />
            {isOpen && (
                <div className="absolute top-12 mt-2 w-[205px] right-[-2px] bg-white rounded-[14px] shadow-[0px_9px_40px_rgba(0,0,0,0.06)] z-[99]">
                    <div className="flex flex-col">
                        <div className="flex gap-[10px] items-center px-[20px] py-[10px] cursor-pointer hover:bg-gray-100">
                            <ManageAccount></ManageAccount>
                            <span>Manage Account</span>
                        </div>
                        <hr className="stroke-[0.5px] stroke-gray-500 opacity-10" />
                        <div className="flex gap-[10px] items-center px-[20px] py-[10px] cursor-pointer hover:bg-gray-100">
                            <ChangePassword></ChangePassword>
                            <span>Change Password</span>
                        </div>
                        <hr className="stroke-[0.5px] stroke-gray-500 opacity-10" />
                        <div className="flex gap-[10px] items-center px-[20px] py-[10px] cursor-pointer hover:bg-gray-100">
                            <ActivityLog></ActivityLog>
                            <span>Activity Log</span>
                        </div>
                        <hr className="stroke-[0.5px] stroke-gray-500 opacity-10" />
                        <div className="flex gap-[10px] items-center px-[20px] py-[10px] cursor-pointer hover:bg-gray-100">
                            <Logout></Logout>
                            <span>Log out</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
