import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { languageCopy } from '../../local';
import { PRODUCT_STOCK } from '../../mocks/productStock';
import Search from '../../assets/Navigation/search.svg?react';
import Navigator from '../../components/common/Navigator';
import ProductStockTable from '../../components/productStock/productStockTable';
import useDebounce from '../../hooks/useDebounce';
const PAGE_SIZE = 9;

export default function ProductStock() {
    const { language } = useLanguage();
    const [page, setPage] = useState<number>(1);
    const [inputValue, setInputValue] = useState<string>('');
    // 디바운스 - 추후 워크북에서 다룰 예정입니다!
    const debouncedInputValue = useDebounce(inputValue, 300);
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        setPage(1);
    }, [debouncedInputValue]);

    const TOTAL_ITEMS = PRODUCT_STOCK.data.length;
    const TOTAL_PAGES = Math.max(1, Math.ceil(TOTAL_ITEMS / PAGE_SIZE));

    useEffect(() => {
        if (page <= TOTAL_PAGES) {
            return;
        }
        setPage(TOTAL_PAGES);
    }, [TOTAL_PAGES, page]);

    return (
        <div className="flex flex-col sm:px-[31px] px-[10px] py-[31px] w-full h-fit bg-bg-white gap-[27px]">
            <div className="flex flex-col items-start w-full sm:items-center sm:justify-between sm:flex-row ">
                <h1 className="title-32 text-dark-gray-500 sm:px-0 px-[30px] text-nowrap">
                    {languageCopy[language].ProductStock.title}
                </h1>
                <div className="relative flex sm:px-0 px-[30px] ">
                    <input
                        value={inputValue}
                        onChange={handleChangeInput}
                        type="text"
                        placeholder="Search product name"
                        className="bg-white border-[0.6px] border-gray-200/60 w-[250px] py-[10px] px-[44px] rounded-[19px]"
                    />
                    <Search className="absolute top-[13.5px] sm:left-[18px] left-[48px]" />
                </div>
            </div>
            <ProductStockTable data={PRODUCT_STOCK.data} />
            <Navigator page={page} setPage={setPage} totalItems={TOTAL_ITEMS} />
        </div>
    );
}
