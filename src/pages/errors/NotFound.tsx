import { useNavigate } from 'react-router-dom';
import Shape from '../../assets/auth-bg/Shape.svg';
import NotFoundSVG from '../../assets/notFound.svg';
import Button from '../../components/common/Button';
export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full min-h-screen overflow-hidden bg-primary-500">
            <img
                src={Shape}
                alt="Shape Background"
                className="absolute top-0 left-0 object-cover w-full h-full"
            />
            <div className="bg-white border-gray-300 border-[0.3px] rounded-[24px] flex flex-col items-center justify-center z-10 px-[80px] py-[90px] gap-[80px]">
                <img src={NotFoundSVG} alt="Not Found" />
                <div className="flex flex-col gap-[35px]">
                    <h1 className="text-dark-gray-500 title-32">
                        Looks like you’ve got lost…
                    </h1>
                    <Button
                        type="button"
                        btnName="Back to Dashboard"
                        btnType="big"
                        style="w-full"
                        onClick={() => {
                            navigate('/');
                        }}
                    ></Button>
                </div>
            </div>
        </div>
    );
}
