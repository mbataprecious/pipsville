import React from 'react';
import { representative } from './landingUtils';

function Section8() {
  return (
    <div className="relative  py-16 mb-20">
      <div className="text-center mb-9">
        <h6 className="text-primary text-xs mb-2">WHO ARE WE</h6>
        <h5 className="text-[#0F1642]">Meet Our Representatives</h5>
      </div>
      <div className="flex flex-wrap justify-center md:justify-between">
        {representative.map((x) => (
          <div
            key={x.name}
            style={{
              background: `url("${x.img}") 
          no-repeat center center/cover`,
            }}
            className=" md:w-[49.5%] mb-2 flex w-full flex-col justify-center items-end h-[25.25rem]"
          >
            <div className="border-l-[.5rem] w-[70%] border-primary bg-white translate-y-[3rem] p-4">
              <h6 className="text-[#0F2851] mb-2">{x.name}</h6>
              <p className=" text-[#828282] mb-2">Representative </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section8;
