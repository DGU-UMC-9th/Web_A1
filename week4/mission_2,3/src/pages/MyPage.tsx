import React, { useEffect, useState } from 'react'
import { getMyInfo } from '../apis/auth'
import { ResponseMyinfoDto } from '../types/auth';

const MyPage = () => {
    const [data, setData] = useState<ResponseMyinfoDto>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);
        };

        setData(response.data);
    })


    return <div>{data.name}</div>;
}

export default MyPage
