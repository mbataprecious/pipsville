import React from 'react';

import tradebg from '../../assets/img/bg6.png';
import tradeImg from '../../assets/img/trade view.png';
import { crypto } from './landingUtils';
import Image from 'next/image';

function Section6() {
  return (
    <div className="relative px-5 pb-10">
      <Image src={tradebg} alt="background" layout="fill" objectFit="cover" priority />
      <div className="relative flex flex-col items-center lg:container py-4 px-4 lg:px-0 mx-auto">
        <h5 className="text-[#0F1642] text-center md:w-[42rem]">
          Save time.<span className="text-[#EA5455]">Get higher return.</span>
          Multiply wealth.
        </h5>
        <div className="flex flex-col items-center lg:flex-row lg:justify-between mt-[5ssrem] p-5 md:p-14 w-full">
          <div className="w-[80%] lg:w-[60%]">
            <Image src={tradeImg} alt="trade" />
          </div>
          <div className="flex-1">
            <div className="md:w-[386px]">
              {crypto.map((x) => (
                <div key={x.color} className="flex mb-4">
                  <div className="pt-5">
                    <div style={{ background: `#${x.color}` }} className={`rounded-full w-[20px] h-[20px]`}>
                      {' '}
                    </div>
                  </div>
                  <div className="pl-3">
                    <h6 className="text-[#0F2851]">{x.title}</h6>
                    <p className="text-[#817676]">{x.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section6;
