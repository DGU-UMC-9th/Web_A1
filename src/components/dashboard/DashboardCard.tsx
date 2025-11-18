import TrendingUp from '../../assets/dashboard/trendingUp.svg?react';
import TrendingDown from '../../assets/dashboard/trendingDown.svg?react';
import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';
import { formatNumber } from '../../utils/formatNumber';

export default function DashboardCard({
    title,
    num,
    percentage,
    percentageUp,
    children,
}: {
    title: string;
    num: string | number;
    percentage: number;
    percentageUp: boolean;
    children: React.ReactNode;
}) {
    const { language } = useLanguage();

    return (
        <div className="bg-white rounded-[14px] p-[16px] flex flex-col gap-[30px] min-w-[266px]">
            <div className="flex justify-between">
                <div className="flex gap-[16px] flex-col">
                    <div className="body-16 text-dark-gray-500 opacity-70">
                        {title}
                    </div>
                    <div className="title-28 text-dark-gray-500">
                        {formatNumber(num)}
                    </div>
                </div>
                {children}
            </div>
            <div className="flex text-gray-600 body-16 gap-[4px] text-nowrap">
                {percentageUp ? <TrendingUp /> : <TrendingDown />}
                <span
                    className={`${
                        percentageUp ? 'text-green-500' : 'text-pink-500'
                    }`}
                >
                    {percentage}%
                </span>
                {percentageUp
                    ? languageCopy[language].Dashboard.total.up
                    : languageCopy[language].Dashboard.total.down}
            </div>
        </div>
    );
}
