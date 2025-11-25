export type TProductStock = {
    id: number;
    img: string;
    name: string;
    category: string;
    price: number;
    piece: number;
    availableColor: string[];
};

export type TProductStockResponse = {
    data: TProductStock[];
};
