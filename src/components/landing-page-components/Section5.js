import React from 'react';
import bgImage from '../../assets/img/bg5.png';
import icon1 from '../../assets/img/icon1.png';
import Image from 'next/image';

function Section5() {
  return (
    <div className="relative pb-20">
      <Image src={bgImage} alt="background" layout="fill" objectFit="cover" priority />
      <div className="relative lg:container px-4 mx-auto">
        <h5 className="text-[#fff] pt-4 text-center">What We Do</h5>
        <div className="flex flex-col md:flex-row md:justify-between mt-[7rem] p-10 md:p-14 bg-[#1081E8BF] w-full">
          {[1, 2, 3].map((x) => (
            <div
              key={x}
              className="flex text-[#4F4F4F] mb-6 md:mb-0 text-center w-full md:w-[31%] flex-col items-center p-5 bg-[#F9FBFF]"
            >
              <Image src={icon1} alt="icon market" width={75} height={71.1} />
              <h6 className="my-2 ">Market Strategy</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque. In est ante in nibh..
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section5;
