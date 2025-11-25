import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/errors/NotFound';
import AuthLayout from '../layout/AuthLayout';
import RootLayout from '../layout/RootLayout';
import Todo from '../pages/app/Todo';
import TodoNew from '../pages/app/TodoNew';
import CalendarNew from '../pages/app/CalendarNew';
import Calendar from '../pages/app/Calendar';
import Pricing from '../pages/app/Pricing';
import ProductStock from '../pages/app/ProductStock';
import OrderList from '../pages/app/OrderList';
import Inbox from '../pages/app/Inbox';
import Favorites from '../pages/app/Favorites';
import Dashboard from '../pages/app/Dashboard';
import Contact from '../pages/app/Contact';
import ContactNew from '../pages/app/ContactNew';
import Invoice from '../pages/app/Invoice';
import UIElements from '../pages/app/UIElements';
import Team from '../pages/app/Team';
import TeamNew from '../pages/app/TeamNew';
import Table from '../pages/app/Table';
import Settings from '../pages/app/Settings';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';

export const router = createBrowserRouter([
    // 1) Auth 영역 (/login 등) – 비보호
    {
        path: '/auth',
        element: <AuthLayout />, // Auth 전용 레이아웃
        children: [
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <SignUp /> },
        ],
        errorElement: <NotFound />,
    },

    // 2) App 영역 (/app/**) – 전체 보호
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'products', element: <ProductStock /> },
            { path: 'favorites', element: <Favorites /> },
            { path: 'inbox', element: <Inbox /> },
            { path: 'order-lists', element: <OrderList /> },
            { path: 'product-stock', element: <ProductStock /> },
            { path: 'pricing', element: <Pricing /> },
            {
                path: 'calendar',
                children: [
                    { index: true, element: <Calendar /> },
                    { path: 'new', element: <CalendarNew /> },
                ],
            },
            {
                path: 'todo',
                children: [
                    { index: true, element: <Todo /> },
                    { path: 'new', element: <TodoNew /> },
                ],
            },
            {
                path: 'contact',
                children: [
                    { index: true, element: <Contact /> },
                    { path: 'new', element: <ContactNew /> },
                ],
            },
            { path: 'invoice', element: <Invoice /> },
            { path: 'ui-elements', element: <UIElements /> },
            {
                path: 'team',
                children: [
                    { index: true, element: <Team /> },
                    { path: 'new', element: <TeamNew /> },
                ],
            },
            { path: 'table', element: <Table /> },
            { path: 'settings', element: <Settings /> },
        ],
    },
]);
