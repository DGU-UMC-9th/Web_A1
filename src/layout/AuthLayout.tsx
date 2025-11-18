import { Outlet } from 'react-router-dom';

import Shape from '../assets/auth-bg/Shape.svg';
const AuthLayout = () => {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center min-h-screen bg-primary-500 overflow-hidden">
            <img
                src={Shape}
                alt="Shape Background"
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="bg-white border-gray-300 border-[0.3px] rounded-[24px] flex flex-col items-center justify-center z-10 sm:px-[57px] px-[30px] py-[60px] min-w-[350px] w-[90vw] max-w-[600px]">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
