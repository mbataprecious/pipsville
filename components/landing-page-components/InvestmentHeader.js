import Navbar from './Navbar';
import Image from 'next/image';
//import bgImage from '../assets/img/bg-drop.png';
import bgImage from '../../assets/img/bg.png';
// ----------------------------------------------------------------------

export default function HeaderSection() {
  // useEffect(() => {
  //   if (router.pathname == '/') {
  //     router.push('/dashboard/one');
  //   }
  // });

  return (
    <>
      <div className="relative h-[640px]">
        <Image src={bgImage} alt="background" layout="fill" objectFit="cover" priority />
        <Navbar />
        <div className="relative bg-[#0000005f] h-full">
          <div className="  lg:container px-4 flex justify-center mx-auto">
            <div className="flex flex-col md:flex-row mt-[12rem] w-full">
              <div className=" max-w-[800px] bg-[#0f1642e0] mx-auto p-7 sm:p-10 pt-5">
                <div className=" text-center">
                  <h1 className="font-display font-extrabold text-white text-[2.5rem] sm:text-[3rem] lg:text-[4.5rem] leading-[2.7rem] md:leading-[3.7rem] lg:leading-[4.813rem] mb-5">
                    Investment
                  </h1>
                  <p className="text-white">
                    Pipsville Limited is one of the few investment brokers on the market to have capital loss insurance.
                    Our company is fully compliant with the PCI data security standards. We encrypt and protect your
                    data with the latest and most advanced algorithms, so you never have to worry about the safety of
                    your funds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
