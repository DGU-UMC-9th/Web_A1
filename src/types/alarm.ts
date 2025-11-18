export type TAlarm = {
    id: number;
    title: string;
    message: string;
    img: string;
    link: string;
};

export type TNotificationResponse = {
    data: TAlarm[];
};
