import React from 'react';
import Image from 'next/image';
import bgImage from '../../assets/img/sec2bg.png';
import BoxButton from './BoxButton';
import { useRouter } from 'next/router';

//we participates in providing cloud server mining and incorporates Proof of Stake (PoS) using technology, developed by a Group of Experts in the field of IT and Cryptocurrencies

function Section2() {
  const router = useRouter();
  return (
    <section>
      <div className="relative pb-20">
        <Image src={bgImage} alt="background" layout="fill" objectFit="cover" priority />
        <div className="relative lg:container mx-auto">
          <div className="flex py-12">
            <div className="flex-1 md:block hidden">{''}</div>
            <div className="flex-1 px-10 pt-18 md:pt-10 md:pr-0 md:pl-44 flex flex-col text-center md:text-left">
              <h5 className="text-black mb-3">For a secure and planned future</h5>
              <p className="text-[#4F4F4F] mb-2">
                We can claim of high and stable profit thanks to our three tier, tried-and-true income generation
                method! After the investment time, the principal was refunded! Withdrawals are simple and quick to make
                at any moment within 12 hours of request! Minimum!
              </p>
              <div>
                <BoxButton
                  className="hover:bg-blue-700 bg-primary text-white mr-3"
                  onClick={() => router.push('/register')}
                >
                  Discover more
                </BoxButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section2;
