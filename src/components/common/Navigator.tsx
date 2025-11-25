import Dropdown from '../../assets/Navigation/dropdown.svg?react';

type TNavigatorProps = {
    page: number;
    setPage: (page: number) => void;
    totalItems: number;
};

export default function Navigator({
    page,
    setPage,
    totalItems,
}: TNavigatorProps) {
    const PAGE_SIZE = 9;
    const TOTAL_PAGES = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

    const handleNextPage = () => {
        if (page >= TOTAL_PAGES) return;
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page <= 1) return;
        setPage(page - 1);
    };

    const startIndex = totalItems > 0 ? (page - 1) * PAGE_SIZE + 1 : 0;
    const endIndex = totalItems > 0 ? Math.min(page * PAGE_SIZE, totalItems) : 0;

    const isPrevDisabled = page <= 1;
    const isNextDisabled = page >= TOTAL_PAGES;
    return (
        <div className="flex items-center justify-between w-full">
            <span className="text-dark-gray-500 body-14">
                Showing {startIndex}-{endIndex} of {totalItems}
            </span>
            <div className="bg-gray-50 place-self-center grid grid-cols-2 border border-gray-200 rounded-[8px] w-[96px] h-[32px]">
                <button
                    onClick={handlePrevPage}
                    type="button"
                    aria-label="Previous page"
                    disabled={isPrevDisabled}
                    className={`flex items-center justify-center border-r border-gray-200
                        ${
                            isPrevDisabled
                                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                                : ''
                        }`}
                >
                    <Dropdown
                        fill="var(--color-dark-gray-500)"
                        className="rotate-90"
                        aria-hidden="true"
                    />
                </button>

                <button
                    onClick={handleNextPage}
                    type="button"
                    aria-label="Next page"
                    disabled={isNextDisabled}
                    className={`flex items-center justify-center
                        ${
                            isNextDisabled
                                ? 'opacity-50 cursor-not-allowed pointer-events-none'
                                : ''
                        }`}
                >
                    <Dropdown
                        fill="var(--color-dark-gray-500)"
                        className="rotate-270"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    );
}
