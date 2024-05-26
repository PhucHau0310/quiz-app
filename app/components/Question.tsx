import { useEffect, useRef, useState } from 'react';
import Answer from './Answer';

interface AnswerData {
    id: number;
    text: string;
    isCorrect: boolean;
    quizId: number;
}

interface QuestionData {
    question: string;
    answers: AnswerData[];
}

interface QuestionProps {
    itemQues: QuestionData;
    questionIndex: number;
    selectedAnswer: number;
    setSelectedAnswer: (answerIndex: number) => void;
    submitTrueFalse?: Boolean[];
    isSubmit: Boolean;
}

const Question = ({
    itemQues,
    selectedAnswer,
    setSelectedAnswer,
    submitTrueFalse,
    isSubmit,
}: QuestionProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-2/3 my-2">
            <div className="relative">
                <p
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`text-lg font-semibold w-full mb-6 line-clamp-2 transition-all`}
                >
                    {itemQues.question || 'Not question !'}
                </p>

                <div
                    className={`w-1/2 bg-gray-600 text-white absolute -top-20 -right-60 z-20 rounded-lg p-4 font-medium text-base ${
                        isHovered ? 'block' : 'hidden'
                    } `}
                >
                    {itemQues.question || 'Not question !'}
                </div>

                <Answer
                    answers={itemQues.answers}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    submitTrueFalse={submitTrueFalse}
                    isSubmit={isSubmit}
                />
            </div>
        </div>
    );
};

export default Question;
