// src/constants/menus.ts
import * as I from '../assets/Navigation';
import en from '../local/en.json';

export type MenuItem = {
    label: string;
    translationKey: keyof typeof en.Sidebar;
    to: string; // 라우트 경로
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const MAIN: MenuItem[] = [
    {
        label: 'Dashboard',
        translationKey: 'dashboard',
        to: '/',
        icon: I.IcDashboard,
    },
    {
        label: 'Products',
        translationKey: 'products',
        to: '/products',
        icon: I.IcProducts,
    },
    {
        label: 'Favorites',
        translationKey: 'favorites',
        to: '/favorites',
        icon: I.IcFavorites,
    },
    {
        label: 'Inbox',
        translationKey: 'inbox',
        to: '/inbox',
        icon: I.IcInbox,
    },
    {
        label: 'Order Lists',
        translationKey: 'orderLists',
        to: '/order-lists',
        icon: I.IcOrders,
    },
    {
        label: 'Stock',
        translationKey: 'stock',
        to: '/product-stock',
        icon: I.IcStock,
    },
];

export const PAGES: MenuItem[] = [
    {
        label: 'Pricing',
        translationKey: 'pricing',
        to: '/pricing',
        icon: I.IcPricing,
    },
    {
        label: 'Calendar',
        translationKey: 'calendar',
        to: '/calendar',
        icon: I.IcCalendar,
    },
    {
        label: 'To-Do',
        translationKey: 'todo',
        to: '/todo',
        icon: I.IcTodo,
    },
    {
        label: 'Contact',
        translationKey: 'contact',
        to: '/contact',
        icon: I.IcContact,
    },
    {
        label: 'Invoice',
        translationKey: 'invoice',
        to: '/invoice',
        icon: I.IcInvoice,
    },
    {
        label: 'UI Elements',
        translationKey: 'uiElements',
        to: '/ui-elements',
        icon: I.IcUI,
    },
    {
        label: 'Team',
        translationKey: 'team',
        to: '/team',
        icon: I.IcTeam,
    },
    {
        label: 'Table',
        translationKey: 'table',
        to: '/table',
        icon: I.IcTable,
    },
];

export const FOOTER: MenuItem[] = [
    {
        label: 'Settings',
        translationKey: 'settings',
        to: '/settings',
        icon: I.IcSettings,
    },
    {
        label: 'Logout',
        translationKey: 'logout',
        to: '/auth/login',
        icon: I.IcLogout,
    },
];
