import React from 'react';
import { Button } from '@mui/material';
import plans from '../../helpers/plans';
import { useRouter } from 'next/router';
import numeral from 'numeral';

function PlanBody() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };
  return (
    <section className="mt-10">
      <div className="lg:container mx-auto flex flex-col sm:px-8  pb-20">
        <div className="flex-1 bg-[#1081e80f] text-center rounded-xl flex flex-col items-center   py-6 md:px-10">
          <h6 className="text-primary text-xs">OUR PLANS</h6>
          <h5 className=" my-4">Investment Plans</h5>
          <p className="text-[#4F4F4F]">
            We pride ourselves in providing first class services in the industry. Our strong expertise at understanding
            clients’ needs and mapping them against a wide range of superior products gives us a comprehensive edge in
            the market share.
          </p>
          <div className="w-full px-8 sm:px-4">
            <div className="flex justify-around mt-16 flex-wrap flex-col md:flex-row">
              {plans.map((plan) => (
                <div key={plan.id} className="mb-16">
                  <div className="relative rounded-[18.5377px] pb-3 box-border overflow-hidden border-2 border-primary bg-white  sm:w-[380px]">
                    <div
                      style={{ backgroundImage: 'url(/img/Intersect.svg)' }}
                      className="flex justify-center items-center w-full bg-no-repeat h-[140px] bg-center bg-cover"
                    >
                      <h5 className=" text-[24px] sm:text-[32px]	text-white">{`${plan.name.toUpperCase()} PLAN`}</h5>
                    </div>

                    <div>
                      <div className="flex items-end justify-center mt-2 mb-14">
                        <h5 className="text-[50px] text-black">{numeral(plan.interest).format('0.0')}%</h5>{' '}
                        <p className="text-[20px] sm:text-black">/30days</p>
                      </div>
                      <p className="text-[20px] mb-5">${numeral(plan.minimum).format('0,0.0')} Min. Deposit</p>
                      <p className="text-[20px] mb-5">${numeral(plan.maximum).format('0,0.0')} Max. Deposit</p>
                      <p className="text-[20px] mb-5 italic text-primary">10% Referral Bonus</p>
                      <p className="text-[20px] mb-5 italic text-primary">You get back your capital</p>
                      <Button variant="outlined" size="large" onClick={handleClick}>
                        {' '}
                        GET STARTED
                      </Button>
                    </div>

                    {/* <div className="bg-white w-full h-full absolute top-0 z-[-1]" /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanBody;
