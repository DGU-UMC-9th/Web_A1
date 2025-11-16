export type TDashboardCard = {
    id: number;
    title: 'totalUser' | 'totalOrders' | 'totalSales' | 'totalPending';
    num: number;
    percentage: number;
    percentageUp: boolean;
};

export type TDashboardCardsResponse = TDashboardCard[];

export type TPoint = {
    x: number;
    y: number;
    point: boolean;
};

export type TSalesDetailResponse = {
    month: string;
    data: TPoint[];
    max: TPoint;
};

export type TDealDetail = {
    id: number;
    name: string;
    img: string;
    location: string;
    date: string;
    piece: number;
    amount: number;
    status: 'Delivered' | 'Pending' | 'Rejected';
};

export type TDealDetailResponse = {
    data: TDealDetail[];
};

export type TMonth =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';
