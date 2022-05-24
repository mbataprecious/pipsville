import React from 'react';
import bgImage from '../../assets/img/testimonybg.png';
import Image from 'next/image';
import MyCarousel from './myCarosel';
// import SvgIconStyle from '../SvgIconStyle';

function Section10() {
  return (
    <div className="relative py-10">
      <Image src={bgImage} alt="background" layout="fill" objectFit="cover" priority />
      <div className="relative xl:container text-white text-center px-4 mx-auto">
        <h5 className="text-[#fff] pt-4 mb-3">What Our Client’s Say</h5>
        <p className="mb-6">We have been working with clients around the world</p>
        <div className="">
          {/* <div className="w-[19rem]">
            <div className="w-full bg-white p-6 rounded-[0.625rem]">
              <h6 className="text-[#0F2851] mb-2">Efficient Collaborating</h6>
              <p className="text-[#6E6B7B]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat
                nunc sem.
              </p>
            </div>
            <div className="flex flex-col mt-4 items-center">
              <img
                src="/img/face.jpg"
                className="object-center object-cover rounded-full w-[56px] h-[56px]"
                alt="testimony dp"
              />
              <h6 className="text-[1.125rem]">liam rosey</h6>
              <p>Entreprenuer</p>
            </div>
          </div> */}
        </div>
        <MyCarousel />
      </div>
    </div>
  );
}

export default Section10;
