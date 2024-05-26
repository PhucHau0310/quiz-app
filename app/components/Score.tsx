import Image from 'next/image';
import CancelIcon from '@/public/cancel-svg.svg';

interface ScoreProps {
    scoreUser: number | undefined;
    setShowScore: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Score = ({ scoreUser, setShowScore }: ScoreProps) => {
    return (
        <div className="rounded-lg flex flex-row items-center gap-3 px-4 py-8 top-14 left-1/4 z-20 absolute bg-gradient-to-b from-[#eef6ec] to-[#b9dee1]">
            <h1 className="font-semibold text-2xl">
                {`Well Done! Your Score: ${scoreUser}`}
            </h1>
            <Image
                src={CancelIcon}
                width={30}
                height={30}
                alt="icon cancel"
                className="cursor-pointer"
                onClick={() => setShowScore(false)}
            />
        </div>
    );
};

export default Score;
