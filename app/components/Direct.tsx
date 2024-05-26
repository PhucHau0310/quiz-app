import { useEffect, useRef } from 'react';

interface DirectProps {
    totalQuestions: number;
    selectQues: number;
    setCurrentQues: React.Dispatch<React.SetStateAction<number>>;
    submitTrueFalse?: Boolean[];
}

const Direct = ({
    totalQuestions,
    setCurrentQues,
    selectQues,
    submitTrueFalse,
}: DirectProps) => {
    const numbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);
    const currentQuestionRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        if (currentQuestionRef.current) {
            currentQuestionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }, [selectQues]);

    return (
        <div className="flex flex-row items-center justify-between my-6">
            <button
                onClick={() => {
                    if (selectQues > 1) {
                        setCurrentQues(selectQues - 1);
                    } else {
                        setCurrentQues(totalQuestions);
                    }
                }}
                className="hover:bg-[#273d30] hover:text-white  text-base font-medium border-2 border-[#273d30] px-4 py-2 rounded-lg"
            >
                Prev
            </button>
            <ul className="flex flex-row mx-4 gap-3 w-[100%] overflow-x-auto scrollbar-none">
                {numbers.map((num, idx) => (
                    <li
                        key={idx}
                        onClick={() => setCurrentQues(idx + 1)}
                        ref={num === selectQues ? currentQuestionRef : null}
                        //     className={`p-2 rounded-full ${
                        //         submitTrueFalse && submitTrueFalse[idx] === false
                        //             ? 'bg-red-500'
                        //             : 'bg-gray-300'
                        //     }
                        // ${selectQues === idx + 1 ? 'ring-2 ring-black' : ''}`}
                        className={`${
                            idx + 1 === selectQues && 'bg-[#273d30] text-white'
                        } hover:bg-[#273d30] hover:text-white cursor-pointer flex-shrink-0 flex items-center justify-center border border-[#989d97] w-12 px-4 py-2 rounded-lg
                        ${
                            submitTrueFalse &&
                            submitTrueFalse[idx] === false &&
                            'bg-red-500 text-white'
                        } 
                        `}
                    >
                        {num}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => {
                    if (selectQues < totalQuestions) {
                        setCurrentQues(selectQues + 1);
                    } else {
                        setCurrentQues(1);
                    }
                }}
                className="hover:bg-[#273d30] hover:text-white  text-base font-medium border-2 border-[#273d30] px-4 py-2 rounded-lg"
            >
                Next
            </button>
        </div>
    );
};

export default Direct;
