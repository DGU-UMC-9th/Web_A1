import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';
import { DEALS_DETAIL } from '../../mocks/dealsDetail';
import DealsDetailItem from './DealsDetailItem';
import MonthSelectCard from './MonthSelectCard';

type DealsDetailColumnKey =
    | 'productName'
    | 'location'
    | 'dateTime'
    | 'piece'
    | 'amount'
    | 'status';

const headerConfig: Array<{ key: DealsDetailColumnKey; className?: string }> = [
    { key: 'productName', className: 'first:rounded-l-[12px]' },
    { key: 'location' },
    { key: 'dateTime' },
    { key: 'piece' },
    { key: 'amount' },
    { key: 'status', className: 'last:rounded-r-[12px] text-center' },
];

export default function DealsDetail() {
    const { language } = useLanguage();
    const { dealsDetails } = languageCopy[language].Dashboard;

    const tdStyle =
        'text-dark-gray-500 body-14 opacity-80 px-[20px] py-[12px] align-middle border-t-[0.6px] border-t-gray-500/60';
    return (
        <MonthSelectCard
            title={languageCopy[language].Dashboard.dealsDetails.title}
        >
            <table className="w-full overflow-x-scroll table-auto">
                <thead>
                    <tr className="relative bg-gray-50 border-hidden">
                        {headerConfig.map(({ key, className }) => (
                            <th
                                key={key}
                                className={` text-dark-gray-500 title-14 font-medium px-[20px] py-[12px] text-nowrap text-left ${
                                    className ?? ''
                                }`}
                            >
                                {dealsDetails[key]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {DEALS_DETAIL.data.map((deal) => {
                        return (
                            <DealsDetailItem
                                key={deal.id}
                                deal={deal}
                                tdStyle={tdStyle}
                            />
                        );
                    })}
                </tbody>
            </table>
        </MonthSelectCard>
    );
}
