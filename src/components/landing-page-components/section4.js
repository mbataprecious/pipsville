import React from 'react';
import Image from 'next/image';
import bgImage from '../../assets/img/side picture.png';

function section4() {
  return (
    <section className="mt-10">
      <div className="lg:container mx-auto flex flex-col md:flex-row  pb-20">
        <div className="flex-1 md:w-[5.125rem] flex flex-col items-center md:items-start text-center px-5 md:text-left py-6">
          <h6 className="text-primary text-xs mb-6">ABOUT US</h6>
          <h5 className="">Financial Freedom without Boundaries</h5>
          <hr className="bg-primary h-1 my-4 " />
          <p className="text-[#4F4F4F]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque. In est ante in nibh. Blandit volutpat
            maecenas volutpat blandit aliquam etiam erat velit scelerisque. Blandit volutpat maecenas volutpat blandit
            aliquam etiam erat velit scelerisque.
          </p>
        </div>
        <div className="flex-1 pt-4">
          <Image src={bgImage} alt="background" />
        </div>
      </div>
    </section>
  );
}

export default section4;
