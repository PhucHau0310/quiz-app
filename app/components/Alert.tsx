import { useEffect, useState } from 'react';
import CancelIcon from '@/public/cancel-svg.svg';
import Image from 'next/image';

interface AlertProps {
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alert = ({ setShowAlert }: AlertProps) => {
    const [countdown, setCountdown] = useState<number>(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 1) {
                    clearInterval(interval);
                    setShowAlert(false);
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [setShowAlert]);

    return (
        <div className="rounded-lg flex flex-row items-center gap-3 px-4 py-8 top-14 left-1/4 z-20 absolute bg-gradient-to-b from-[#eef6ec] to-[#b9dee1]">
            <h1 className="font-semibold text-2xl">
                Please fill in all questions! ({countdown}s)
            </h1>
            <Image
                src={CancelIcon}
                width={30}
                height={30}
                alt="icon cancel"
                className="cursor-pointer"
                onClick={() => setShowAlert(false)}
            />
        </div>
    );
};

export default Alert;
