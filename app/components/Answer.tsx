interface AnswerProps {
    answers: {
        id: number;
        text: string;
        isCorrect: boolean;
        quizId: number;
    }[];
    selectedAnswer: number;
    setSelectedAnswer: (answerIndex: number) => void;
    submitTrueFalse?: Boolean[];
    isSubmit: Boolean;
}

const Answer = ({
    answers,
    selectedAnswer,
    setSelectedAnswer,
    submitTrueFalse,
    isSubmit,
}: AnswerProps) => {
    return (
        <div className="w-full grid grid-cols-2 grid-rows-2 gap-8">
            {answers.map((answer, index) => (
                <div
                    onClick={() => !isSubmit && setSelectedAnswer(index)}
                    key={index}
                    className={`${selectedAnswer === index && 'bg-slate-400'}
                     ${
                         submitTrueFalse
                             ? answer.isCorrect
                                 ? 'bg-[#273d30] text-white'
                                 : selectedAnswer === index && 'bg-red-200'
                             : selectedAnswer === index && 'bg-slate-400'
                     }                       
                    hover:bg-slate-400 cursor-pointer border border-[#989d97] rounded-lg px-2 py-2 flex justify-center items-center relative`}
                >
                    <p className="font-bold absolute left-2 top-2 text-[#505050]">
                        {String.fromCharCode(65 + index)}.
                    </p>
                    <span className="font-medium">{answer.text}</span>
                </div>
            ))}
        </div>
    );
};

export default Answer;
