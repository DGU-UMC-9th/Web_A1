import type { ComponentType, SVGProps } from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';
import en from '../../local/en.json';
import { DASHBOARD_CARDS } from '../../mocks/dashboardCard';
import DashboardCard from './DashboardCard';
import TotalUser from '../../assets/dashboard/totalUser.svg?react';
import TotalOrder from '../../assets/dashboard/totalOrder.svg?react';
import TotalSales from '../../assets/dashboard/totalSales.svg?react';
import TotalPending from '../../assets/dashboard/totalPending.svg?react';

type DashboardSummaryKey = Exclude<
    keyof typeof en.Dashboard.total,
    'up' | 'down'
>;

type CardConfig = {
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    valuePrefix?: string;
};

const CARD_CONFIG: Record<number, CardConfig> = {
    1: { Icon: TotalUser },
    2: { Icon: TotalOrder },
    3: { Icon: TotalSales, valuePrefix: '$' },
    4: { Icon: TotalPending },
};

export default function DashboardCards() {
    const { language } = useLanguage();
    return (
        <div className="grid max-[630px]:grid-cols-1 max-[1400px]:grid-cols-2 grid-cols-4 gap-[20px] w-full">
            {DASHBOARD_CARDS.map(
                ({ id, title, num, percentage, percentageUp }) => {
                    const config = CARD_CONFIG[id];
                    const displayTitle = config
                        ? languageCopy[language].Dashboard.total[
                              title as DashboardSummaryKey
                          ]
                        : title;
                    // 숫자에 접두사가 필요한 경우 처리
                    const displayNum = config?.valuePrefix
                        ? `${config.valuePrefix}${num}`
                        : num;
                    const Icon = config?.Icon;

                    return (
                        <DashboardCard
                            key={id}
                            title={displayTitle}
                            num={displayNum}
                            percentage={percentage}
                            percentageUp={percentageUp}
                        >
                            {Icon ? <Icon /> : null}
                        </DashboardCard>
                    );
                }
            )}
        </div>
    );
}
