'use client';

import fbIcon from '@/public/facebook-svg.svg';
import ggIcon from '@/public/google-svg.svg';
import Image from 'next/image';
import Lottie from 'react-lottie-player';
import animation from '@/public/Animation.json';
import { signIn } from 'next-auth/react';

const Login = () => {
    return (
        <div className="transition-all flex items-center justify-center w-screen h-screen bg-gradient-to-b from-[#eef6ec] to-[#b9dee1]">
            <div className="bg-white rounded-xl shadow-xl w-2/3 h-2/3 px-10 flex items-center justify-center flex-row">
                <div className="w-1/2  flex flex-col items-center justify-center">
                    <h1 className="text-xl font-semibold">
                        WELCOME TO OUR APPLICATION
                    </h1>
                    <h2 className="text-lg font-medium">Quiz App.</h2>
                    <button
                        onClick={() => signIn('facebook')}
                        className="flex flex-row items-center justify-center gap-4 border-2 border-[#0075ff] w-2/3 px-4 py-2 rounded-lg mt-6"
                    >
                        <Image
                            src={fbIcon}
                            alt="fb icon"
                            width={30}
                            height={30}
                            className=""
                        />
                        <span className="text-base font-semibold">
                            Facebook
                        </span>
                    </button>
                    <button
                        onClick={() => signIn('google')}
                        className="flex flex-row items-center justify-center gap-4 border-2 border-[#f12727] w-2/3 px-4 py-2 rounded-lg mt-6"
                    >
                        <Image
                            src={ggIcon}
                            alt="gg icon"
                            width={30}
                            height={30}
                        />
                        <span className="text-base font-semibold">Google</span>
                    </button>
                    <p className="my-8">
                        By registration you agree to{' '}
                        <span className="text-[#5ea8ff]">Terms Of Use</span> and{' '}
                        <span className="text-[#5ea8ff]">Privacy Policy</span>
                    </p>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <Lottie
                        play
                        loop
                        animationData={animation}
                        className="w-72 h-72 bg-white rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
