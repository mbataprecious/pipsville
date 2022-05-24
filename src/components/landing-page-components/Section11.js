import React from 'react';

import bgImg from '../../assets/img/newsletterImg.png';
import Image from 'next/image';
import BoxButton from './BoxButton';

function Section11() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative lg:container mx-auto bg-primary my-[5rem]">
      <div className="relative pb-10 flex flex-col items-center lg:flex-row lg:justify-between  w-full">
        <div className="hidden md:block text-white flex-1 p-6">
          <h5 className="text-6xl mb-2 w-[18.9rem]">Let’s Work Together</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <form onSubmit={handleSubmit} className="flex items-center mt-6">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="focus:outline-none text-gray-900 placeholder:text-gray-300 text-[1rem] md:text-[1.125rem] w-[12rem] p-[0.875rem]"
            />
            <BoxButton variant="outline" className="text-white py-3">
              Get Started
            </BoxButton>
          </form>
        </div>
        <div className="flex-1 px-10 pb-4">
          <div className="relative flex flex-col w-full px-6">
            <Image src={bgImg} className="p-6 w-full max-w-[34.25rem] inset-0" alt="news letter bg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section11;
