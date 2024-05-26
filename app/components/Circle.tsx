interface CircleProps {
    selectedAnswers: (number | null)[];
    totalQuestions: number;
    submitTrueFalse?: Boolean[];
    isSubmit: Boolean;
}

const Circle = ({
    selectedAnswers,
    totalQuestions,
    submitTrueFalse,
    isSubmit,
}: CircleProps) => {
    const progressLen = selectedAnswers.filter(
        (item: any) => item >= 0 && item !== null
    );
    let countTrue = 0;
    submitTrueFalse?.forEach((item) => item && countTrue++);
    return (
        <>
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
                <circle
                    strokeWidth="10"
                    stroke="#ddd"
                    fill="none"
                    r="60"
                    className="translate-x-1/2 translate-y-1/2 "
                ></circle>
                <circle
                    strokeDasharray={`${
                        (2 * Math.PI * 60 * progressLen.length) / totalQuestions
                    } 9999`}
                    strokeLinecap="round"
                    strokeWidth="10"
                    stroke="#273d30"
                    fill="none"
                    r="60"
                    className="translate-x-1/2 translate-y-1/2 transition-all"
                ></circle>
            </svg>
            <span className="font-semibold text-lg text-[#273d30] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {isSubmit
                    ? `${countTrue} / ${totalQuestions}`
                    : `${progressLen.length} / ${totalQuestions}`}
            </span>
        </>
    );
};

export default Circle;
