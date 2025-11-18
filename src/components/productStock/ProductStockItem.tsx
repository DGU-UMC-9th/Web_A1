import Edit from '../../assets/pencil-write.svg?react';
import Delete from '../../assets/bin.svg?react';
import type { TProductStock } from '../../types/productStack';

const tdStyle = 'text-start px-[16px] body-14';

export default function ProductStockItem({
    img,
    name,
    category,
    price,
    piece,
    availableColor,
    id,
}: TProductStock) {
    return (
        <tr className="h-[90px] border-t-[0.6px] border-t-gray-500/60">
            <td className={tdStyle}>
                <img
                    src={img}
                    alt={name}
                    className="w-[60px] h-[60px] place-self-center object-cover rounded-[8px] aspect-square"
                />
            </td>
            <td className={tdStyle}>{name}</td>
            <td className={tdStyle}>{category}</td>
            <td className={tdStyle}>{price}</td>
            <td className={tdStyle}>{piece}</td>
            <td className={`${tdStyle} text-nowrap`}>
                {availableColor.map((color: string) => (
                    <span
                        key={color}
                        className="inline-block w-5 h-5 mr-1 rounded-full border-gray-500/30 border-[0.5px]"
                        style={{ backgroundColor: color }}
                    ></span>
                ))}
            </td>
            <td className="px-[16px] body-14">
                <div className="bg-gray-50 place-self-center grid grid-cols-2 border border-gray-200 rounded-[8px] w-[96px] h-[32px]">
                    <button
                        onClick={() => {
                            console.log(`Edit item with id: ${id}`);
                        }}
                        type="button"
                        className="flex items-center justify-center border-r border-gray-200"
                    >
                        <Edit />
                    </button>
                    <button
                        onClick={() => {
                            console.log(`Delete item with id: ${id}`);
                        }}
                        type="button"
                        className="flex items-center justify-center"
                    >
                        <Delete />
                    </button>
                </div>
            </td>
        </tr>
    );
}
