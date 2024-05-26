'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Question from '../components/Question';
import Direct from '../components/Direct';
import Circle from '../components/Circle';
import timeIcon from '@/public/time-svg.svg';
import defaultAva from '@/public/user-svg.svg';
import lgOutIc from '@/public/logout-svg.svg';
import { getQuizzes } from '@/lib/actions/quizAction';
import Alert from '../components/Alert';
import Score from '../components/Score';

interface DataUser {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

interface AnswerData {
    id: number;
    text: string;
    isCorrect: boolean;
    quizId: number;
}

interface Quizzes {
    id: number;
    question: string;
    answers: AnswerData[];
}

export default function Home() {
    const [currentQues, setCurrentQues] = useState<number>(1);
    const { data: session } = useSession();
    // console.log(session);
    const [dataUser, setDataUser] = useState<DataUser | null>(null);
    const [allQuizzes, setAllQuizzes] = useState<Quizzes[] | null>(null);

    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [submitTrueFalse, setSubmitTrueFalse] = useState<Boolean[]>();
    const [timeRemaining, setTimeRemaining] = useState<number>(15 * 60);
    const [isSubmit, setSubmit] = useState<Boolean>(false);
    const [showScore, setShowScore] = useState<Boolean>(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                if (session?.user?.id) {
                    const res = await fetch(
                        `/api/user/profile/${session?.user?.id}`
                    );
                    const data: DataUser = await res.json();
                    setDataUser(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getUser();
    }, [session?.user?.id]);

    useEffect(() => {
        const getAllQuiz = async () => {
            try {
                const quizzes = await fetch(`/api/quiz`);
                const res = await quizzes.json();
                const shuffledQuizzes = res.sort(() => 0.5 - Math.random());
                const selectedQuizzes = shuffledQuizzes.slice(0, 10);

                setAllQuizzes(selectedQuizzes);
                setSelectedAnswers(Array(res.length).fill(-1));
            } catch (error) {
                console.log(error);
            }
        };

        getAllQuiz();
    }, []);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timerId = setInterval(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            handleSubmitAnswer(); // Auto-submit when time runs out
        }
    }, [timeRemaining]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    const postScore = async () => {
        try {
            if (isSubmit && showScore) {
                const countTrue =
                    submitTrueFalse?.filter((item) => item).length ?? 0;

                const lengthQuiz = allQuizzes?.length ?? 0;
                const scoreLast = (countTrue / lengthQuiz) * 10;

                const data = {
                    userId: session?.user.id,
                    score: scoreLast,
                };
                const res = await fetch(`/api/user/${session?.user.id}/score`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(data),
                });
                const result = await res.json();
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitAnswer = () => {
        const progressLen = selectedAnswers.filter(
            (item: any) => item >= 0 && item !== null
        );

        if (progressLen.length === allQuizzes?.length) {
            setShowAlert(false);
            const newSubmitTrueFalse = allQuizzes.map(
                (quiz, idx) => quiz.answers[selectedAnswers[idx]].isCorrect
            );
            setSubmitTrueFalse(newSubmitTrueFalse);
            setSubmit(true);
            setShowScore(true);

            if (isSubmit) {
                postScore();
            }
        } else {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };

    return (
        <main className="transition-all h-screen w-screen flex items-center justify-center flex-col bg-gradient-to-b from-[#eef6ec] to-[#b9dee1]">
            {session ? (
                <div className="w-3/5 relative ">
                    {showAlert && <Alert setShowAlert={setShowAlert} />}
                    {showScore && (
                        <Score
                            scoreUser={
                                submitTrueFalse?.filter((item) => item).length
                            }
                            setShowScore={setShowScore}
                        />
                    )}
                    <div className="flex flex-row justify-between items-center w-full mb-4 mt-2">
                        <h1 className="text-4xl font-bold">Quiz.</h1>
                        <div className="flex flex-row items-center gap-6  w-1/3 justify-end">
                            <div className="border border-[#273d30] flex justify-center items-center rounded-full p-1.5 ">
                                <Image
                                    src={dataUser?.avatar || defaultAva}
                                    alt="avatar"
                                    width={30}
                                    height={30}
                                    className="rounded-full flex items-center justify-center"
                                />
                            </div>
                            <div>
                                <p className="text-lg font-medium">
                                    {dataUser?.name}
                                </p>
                                <p className="font-medium text-[#989d97]">
                                    ID: <span>{dataUser?.id}</span>
                                </p>
                                {session && (
                                    <div
                                        className="flex flex-row items-center cursor-pointer"
                                        onClick={() => signOut()}
                                    >
                                        <Image
                                            src={lgOutIc}
                                            alt="log out icon"
                                            width={30}
                                            height={30}
                                        />
                                        <button className="text-base font-medium">
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-md p-16">
                        <div className="flex flex-row items-center justify-between mb-12">
                            <div className="flex flex-row gap-2 items-center">
                                <Image
                                    src={timeIcon}
                                    alt="time icon"
                                    width={45}
                                    height={45}
                                />
                                <div className="flex flex-col justify-center ">
                                    <h2 className="text-[#989d97] font-normal">
                                        Time remaining
                                    </h2>
                                    <p className="text-lg font-medium">
                                        {formatTime(timeRemaining)}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmitAnswer}
                                className="bg-[#273d30] px-6 py-2 rounded-lg text-white w-1/5"
                            >
                                Submit
                            </button>
                        </div>

                        <h2 className="text-base mb-1">
                            Question {currentQues} of {allQuizzes?.length}
                        </h2>

                        <div className="flex flex-row items-center justify-between w-full ">
                            {allQuizzes?.map(
                                (itemQues, idx) =>
                                    idx + 1 === currentQues && (
                                        <Question
                                            key={idx}
                                            itemQues={itemQues}
                                            questionIndex={idx}
                                            selectedAnswer={
                                                selectedAnswers[idx]
                                            }
                                            setSelectedAnswer={(
                                                answerIndex
                                            ) => {
                                                const newSelectedAnswers = [
                                                    ...selectedAnswers,
                                                ];
                                                newSelectedAnswers[idx] =
                                                    answerIndex;
                                                setSelectedAnswers(
                                                    newSelectedAnswers
                                                );
                                            }}
                                            submitTrueFalse={submitTrueFalse}
                                            isSubmit={isSubmit}
                                        />
                                    )
                            )}
                            <div className="bg-slate-700 w-1/3 relative">
                                <Circle
                                    selectedAnswers={selectedAnswers}
                                    totalQuestions={allQuizzes?.length || 0}
                                    submitTrueFalse={submitTrueFalse}
                                    isSubmit={isSubmit}
                                />
                            </div>
                        </div>

                        <Direct
                            totalQuestions={allQuizzes?.length || 0}
                            setCurrentQues={setCurrentQues}
                            selectQues={currentQues}
                            submitTrueFalse={submitTrueFalse}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold text-[#273d30]">
                        {"Let's sign in to test our application 😊"}
                    </h2>
                    <Link
                        href={'/login'}
                        className='className=" my-4 text-lg font-semibold'
                    >
                        <button className="border-2 border-[#273d30] px-10 py-4 rounded-lg  text-[#273d30] hover:bg-[#273d30] hover:text-white transition-all">
                            Sign in
                        </button>
                    </Link>
                </>
            )}
        </main>
    );
}
