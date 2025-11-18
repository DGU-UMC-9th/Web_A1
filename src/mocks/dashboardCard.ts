import type { TDashboardCardsResponse } from '../types/dashboard';

export const DASHBOARD_CARDS: TDashboardCardsResponse = [
    {
        id: 1,
        title: 'totalUser',
        num: 40689,
        percentage: 8.5,
        percentageUp: true,
    },
    {
        id: 2,
        title: 'totalOrders',
        num: 10293,
        percentage: 1.3,
        percentageUp: true,
    },
    {
        id: 3,
        title: 'totalSales',
        num: 89000,
        percentage: 4.3,
        percentageUp: false,
    },
    {
        id: 4,
        title: 'totalPending',
        num: 2040,
        percentage: 1.8,
        percentageUp: true,
    },
];
