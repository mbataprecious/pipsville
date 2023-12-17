import React from "react";

import housebg from "../../assets/img/housing.png";
import Image from "next/image";

function Section7() {
  return (
    <div className="relative px-5 py-16">
      <div className=" flex flex-col items-center lg:container px-4 lg:px-0 mx-auto">
        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between mt-[5ssrem] w-full">
          <Image
            src={housebg}
            alt="background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="hidden md:block flex-1"> </div>
          <div className="flex-1 px-10 pb-10">
            <div className="relative flex flex-col w-full min-h-[33.75rem]">
              <div className="bg-[#0F1642] p-6 w-full max-w-[34.25rem] inset-0">
                <h5 className="text-white mb-3">Real Estate and smart homes</h5>
                <p className="text-[#CFCFCF]">
                  Our assets drive your returns. We pair our extensive network
                  and expertise with the collective buying power of our investor
                  community to acquire high-quality assets ranging from debt to
                  equity, commercial to residential, and more. We follow a
                  &quot;value investing&quot; strategy of acquiring assets for
                  less than what we believe is their intrinsic value, and
                  typically less than their replacement cost. Our team then
                  works to increase the value of each asset over time through
                  hands-on management and in partnership with local operators.
                  We&apos;ve specifically built the Fundrise portfolio with the
                  intention of being able to withstand prolonged periods of
                  economic distress. Nothing can be guaranteed, but because of
                  our conservative approach and extensive underwriting
                  processes, we believe the Fundrise portfolio is, from a
                  risk-adjusted-return standpoint, well positioned to be able to
                  sustain a severe economic downturn.
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
