import React from 'react';

import housebg from '../../assets/img/housing.png';
import Image from 'next/image';

function Section7() {
  return (
    <div className="relative px-5 py-16">
      <div className=" flex flex-col items-center lg:container px-4 lg:px-0 mx-auto">
        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between mt-[5ssrem] w-full">
          <Image src={housebg} alt="background" layout="fill" objectFit="cover" priority />
          <div className="hidden md:block flex-1"> </div>
          <div className="flex-1 px-10 pb-10">
            <div className="relative flex flex-col w-full min-h-[33.75rem]">
              <div className="bg-[#0F1642] p-6 w-full max-w-[34.25rem] inset-0">
                <h5 className="text-white mb-3">Real Estate and smart homes</h5>
                <p className="text-[#CFCFCF]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque. In est ante in nibh. Blandit
                  volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Blandit volutpat maecenas
                  volutpat blandit aliquam etiam erat velit scelerisque. Mi tempus imperdiet nulla malesuada
                  pellentesque. In est ante in nibh. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit
                  scelerisque. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section7;
