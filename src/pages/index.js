// import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/landing-page-components/Navbar';
import Image from 'next/image';
import bgImage from '../assets/img/bg-drop.png';
// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  // useEffect(() => {
  //   if (router.pathname == '/') {
  //     router.push('/dashboard/one');
  //   }
  // });

  return (
    <>
      <header className="relative pb-20">
        <Image src={bgImage} alt="background" layout="fill" objectFit="cover" priority />
        <Navbar />
        <div className="relative container flex justify-center mx-auto">
          <div className=" flex  flex-col lg:flex-row z-10 mt-8 w-full">
            <div className="flex-1 max-w-[32.5rem]">
              <h1 className="font-display font-extrabold text-white text-[4.5rem] leading-[4.813rem]">
                Thinking and Planing for the future
              </h1>
              <p className="font-display mb-4 text-[1.125rem] pr-10 leading-[1.125rem] text-white font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore.
              </p>
              <div>
                <button className="font-display text-[1.125rem] border-none focus:outline-none outline-none hover:bg-blue-700  p-[0.875rem] bg-primary text-white mr-3">
                  Discover more
                </button>
                <button className="font-display text-[1.125rem] border-white border-2 focus:outline-none outline-none text-white px-[0.875rem] hover:bg-white hover:text-black py-3">
                  Get Started
                </button>
              </div>
            </div>
            <div className="flex-1 flex-col justify-center items-center hidden lg:flex">
              <button className="border-none focus:outline-none outline-none rounded-full bg-white text-black w-[4.75rem] h-[4.75rem] flex justify-center items-center mb-4">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.75 12.0219V23.8629L22.9815 17.9964L15.75 12.0219ZM15.684 27.0009C15.2235 27.0009 14.7585 26.9019 14.325 26.6979C13.353 26.2404 12.75 25.3284 12.75 24.3189V11.6799C12.75 10.6719 13.353 9.75989 14.325 9.30239C15.423 8.78489 16.725 8.93489 17.6385 9.68939L25.287 16.0104C25.9005 16.5144 26.25 17.2404 26.25 17.9994C26.25 18.7584 25.9005 19.4859 25.287 19.9899L17.6385 26.3079C17.0865 26.7654 16.3905 27.0009 15.684 27.0009V27.0009Z"
                    fill="black"
                  />
                </svg>
              </button>
              <p className="uppercase font-display font-medium text-white tracking-[0.125rem]">play video</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
