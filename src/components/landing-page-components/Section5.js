import React from 'react';
import bgImage from '../../assets/img/bg5.png';
import { weDo } from './landingUtils';
import Image from 'next/image';

function Section5() {
  return (
    <div className="relative pb-20">
      <Image src={bgImage} alt="background" layout="fill" objectFit="cover" priority />
      <div className="relative lg:container px-4 mx-auto">
        <h5 className="text-[#fff] pt-4 text-center">What We Do</h5>
        <div className="flex flex-col md:flex-row md:justify-between mt-[7rem] p-10 md:p-14 bg-[#1081E8BF] w-full">
          {weDo.map(({ title, details, img }) => (
            <div
              key={title}
              className="flex text-[#4F4F4F] mb-6 md:mb-0 text-center w-full md:w-[31%] flex-col items-center p-5 bg-[#F9FBFF]"
            >
              <Image src={img} alt="icon market" width={75} height={71.1} />
              <h6 className="my-2 ">{title}</h6>
              <p>{details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section5;
