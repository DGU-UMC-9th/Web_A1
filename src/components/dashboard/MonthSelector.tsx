import type { TMonth } from '../../types/dashboard';

const months: TMonth[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export default function MonthSelector({
    setMonth,
    month,
}: {
    setMonth: (month: TMonth) => void;
    month: TMonth;
}) {
    return (
        <select
            value={month}
            onChange={(e) => setMonth(e.target.value as TMonth)}
            className="px-[10px] py-[5px] border border-gray-200 rounded-[4px] outline-none bg-gray-50 body-12 appearance-auto text-[rgba(43,48,52,0.4)]"
        >
            {months.map((m) => (
                <option key={m} value={m}>
                    {m}
                </option>
            ))}
        </select>
    );
}
