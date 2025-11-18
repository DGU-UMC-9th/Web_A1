import { useState } from 'react';
import MonthSelector from './MonthSelector';
import type { TMonth } from '../../types/dashboard';

type MonthSelectCardProps = {
    title: string;
    children: React.ReactNode;
};

export default function MonthSelectCard({
    title,
    children,
}: MonthSelectCardProps) {
    const [month, setMonth] = useState<TMonth>('January');
    return (
        <div className="bg-white rounded-[14px] p-[31px] gap-[35px] flex flex-col w-full">
            <div className="flex items-center justify-between w-full">
                <span className="title-24 text-dark-gray-500">{title}</span>
                <MonthSelector setMonth={setMonth} month={month} />
            </div>
            <div className="min-w-full max-w-full h-fit min-h-[350px] overflow-x-scroll">
                {children}
            </div>
        </div>
    );
}
