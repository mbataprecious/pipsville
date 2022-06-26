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
          <hr className="bg-primary h-1 my-4 w-[82px] " />
          <p className="text-[#4F4F4F]">
            Pipsville strives to build wealth and financial security for its consumers by using the three fastest
            expanding financial sectors: bitcoin, real estate, and forex. Our specialists and industry experts work
            around the clock to generate wealth for us. We have surpassed our goals and want to help 200 billion more
            individuals become financially independent.
            <br />
            Pipsville has an unrivalled national portfolio of developments that include off-plan and new-build
            buy-to-let investment opportunities in the best-performing locations for returns. As the one of the leading
            property consultancy, our extensive track record and our exclusive partnerships allow us to present our
            clients with high-performing UK property investments that traditionally would only be available to
            institutional investors and funds.
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
