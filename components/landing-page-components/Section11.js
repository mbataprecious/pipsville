import React, { useState } from 'react';

import bgImg from '../../assets/img/newsletterImg.png';
import Image from 'next/image';
import BoxButton from './BoxButton';

function Section11() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <div className="relative lg:container mx-auto bg-primary my-[5rem]">
      <div className="relative pb-10 flex flex-col items-center lg:flex-row lg:justify-between  w-full">
        <div className="hidden md:block text-white flex-1 p-6">
          <h5 className="text-6xl mb-2 w-[18.9rem]">Let’s Work Together</h5>
          <p>subscribe to get updates on our latest investment products.</p>
          <form onSubmit={handleSubmit} className="flex items-center mt-6">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="focus:outline-none text-gray-900 placeholder:text-gray-300 text-[1rem] md:text-[1.125rem] w-[12rem] p-[0.875rem]"
            />
            <BoxButton variant="outline" type="submit" className="text-white py-3">
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
