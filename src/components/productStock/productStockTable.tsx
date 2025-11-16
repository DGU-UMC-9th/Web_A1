import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';
import type { TProductStock } from '../../types/productStack';
import ProductStockItem from './ProductStockItem';

const leftHeaderClass =
    'title-14 text-dark-gray-500 text-start py-[12px] px-[16px] text-nowrap';

const centerHeaderClass =
    'title-14 text-dark-gray-500 py-[12px] px-[16px] text-center';

export default function ProductStockTable({ data }: { data: TProductStock[] }) {
    const { language } = useLanguage();
    const productStockCopy = languageCopy[language].ProductStock;

    const tableHeaders: Array<{
        key: keyof typeof productStockCopy;
        className: string;
    }> = [
        { key: 'image', className: centerHeaderClass },
        { key: 'productName', className: leftHeaderClass },
        { key: 'category', className: leftHeaderClass },
        { key: 'price', className: leftHeaderClass },
        { key: 'piece', className: leftHeaderClass },
        { key: 'availableColor', className: leftHeaderClass },
        { key: 'action', className: centerHeaderClass },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-[8px] overflow-x-scroll">
            <table className="w-full border-collapse table-auto border-spacing-0">
                <thead className=" border-gray-200 border-b-[0.6px] ">
                    <tr className="h-[48px] border-b border-gray-200">
                        {tableHeaders.map(({ key, className }) => (
                            <th key={key} className={className}>
                                {productStockCopy[key]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <ProductStockItem key={item.id} {...item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
