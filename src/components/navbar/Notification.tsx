import { useEffect, useRef, useState } from 'react';
import Alarm from '../../assets/Navigation/alarm.svg?react';
import { NOTIFICATIONS } from '../../mocks/notification';
import { useNavigate } from 'react-router-dom';

export default function Notification() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
            ref={dropdownRef}
            className="relative hidden sm:flex"
            onClick={() => setIsOpen(!isOpen)}
        >
            <Alarm />
            <span className="absolute top-[-6px] right-[-3px] bg-pink-500 w-[16px] h-[16px] flex justify-center items-center rounded-full text-white title-12">
                6
            </span>
            {isOpen && (
                <div className="z-[100] flex flex-col absolute top-10 left-[-100px] bg-white rounded-[14px] shadow-[0px_9px_40px_rgba(0,0,0,0.06)] w-[254px]">
                    <h1 className="text-gray-900 body-14 w-full flex px-[20px] py-[14px]">
                        Notification
                    </h1>
                    <hr className="stroke-[0.5px] stroke-gray-500 opacity-10" />
                    <div className="flex flex-col">
                        {NOTIFICATIONS.data.map((notification) => {
                            return (
                                <div
                                    onClick={() => navigate(notification.link)}
                                    key={notification.id}
                                    className="flex px-[20px] items-center gap-[10px] py-[10px] hover:bg-gray-100 hover:cursor-pointer"
                                >
                                    <img
                                        src={notification.img}
                                        alt={notification.title}
                                        className="w-[36px] h-[36px]"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-dark-gray-500 body-14">
                                            {notification.title}
                                        </span>
                                        <span className="text-gray-300 body-12">
                                            {notification.message}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <hr className="stroke-[0.5px] stroke-gray-500 opacity-10" />
                    <div className="flex justify-center text-gray-400 hover:cursor-pointer body-14 py-[14px]">
                        See all notification
                    </div>
                </div>
            )}
        </div>
    );
}
