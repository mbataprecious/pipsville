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
            Pipsville has an unrivalled national portfolio of developments that include off-plan and new-build
            buy-to-let investment opportunities in the best-performing locations for returns. As the UK’s leading
            property consultancy, our extensive track record and our exclusive partnerships allow us to present our
            clients with high-performing UK property investments that traditionally would only be available to
            institutional investors and funds. Before we launch a new development, we undertake extensive due diligence
            to ensure our clients can invest with utmost confidence. We balance a regional focus with a national
            outlook, working with investors to meet their individual needs.
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
