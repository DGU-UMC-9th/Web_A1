import { TOTAL_SALES } from '../../mocks/totalSales';
import SalesDetail from '../../components/dashboard/SalesDetail';
import DealsDetail from '../../components/dashboard/DealsDetail';
import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';
import DashboardCards from '../../components/dashboard/DashboardCards';
export default function Dashboard() {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col sm:px-[31px] px-[10px] py-[31px] w-full h-fit bg-bg-white gap-[27px]">
            <h1 className="title-32 text-dark-gray-500 sm:px-0 px-[30px]">
                {languageCopy[language].Dashboard.title}
            </h1>
            <div className="flex flex-col max-w-[90vw] self-center gap-[27px] items-center justify-center ">
                <DashboardCards />
                <SalesDetail data={TOTAL_SALES} />
                <DealsDetail />
            </div>
        </div>
    );
}
