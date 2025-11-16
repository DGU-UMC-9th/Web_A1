import type { TNotificationResponse } from '../types/alarm';

export const NOTIFICATIONS: TNotificationResponse = {
    data: [
        {
            id: 1,
            title: 'Settings',
            message: 'Update Dashboard',
            img: '/src/images/settings.png',
            link: '',
        },
        {
            id: 2,
            title: 'Event Update',
            message: 'An event date update again',
            img: '/src/images/event.png',
            link: '',
        },
        {
            id: 3,
            title: 'Profile',
            message: 'Update your profile',
            img: '/src/images/profile.png',
            link: '',
        },
        {
            id: 4,
            title: 'Application Error',
            message: 'Check Your running application',
            img: '/src/images/error.png',
            link: '',
        },
    ],
};
