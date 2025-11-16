import type { TDealDetail } from '../../types/dashboard';
import { formatDealDate } from '../../utils/formatDate';
import { formatNumber } from '../../utils/formatNumber';

type TDealsDetailItemProps = {
    deal: TDealDetail;
    tdStyle: string;
};

export default function DealsDetailItem({
    deal,
    tdStyle,
}: TDealsDetailItemProps) {
    return (
        <tr key={deal.id} className="h-[96px]">
            <td className={tdStyle}>
                <div className="flex items-center gap-[12px]">
                    <img
                        src={deal.img}
                        alt={deal.name}
                        className="w-[40px] h-[40px] object-cover"
                    />
                    {deal.name}
                </div>
            </td>
            <td className={tdStyle}>{deal.location}</td>
            <td className={tdStyle}>{formatDealDate(deal.date)}</td>
            <td className={tdStyle}>{formatNumber(deal.piece)}</td>
            <td className={tdStyle}>${formatNumber(deal.amount)}</td>
            <td className="px-[20px] border-t-[0.6px] border-t-gray-500/60">
                <span
                    className={`text-white title-14 w-[80px] flex justify-center min-w-[80px] py-[4px]  ${
                        deal.status === 'Delivered'
                            ? ' bg-green-500'
                            : deal.status === 'Pending'
                            ? 'bg-yellow-500'
                            : 'bg-pink-500'
                    } px-[10px] py-[4px] rounded-[13.5px]`}
                >
                    {deal.status}
                </span>
            </td>
        </tr>
    );
}
