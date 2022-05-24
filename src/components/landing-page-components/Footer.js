import React from 'react';
import { linkArray } from './landingUtils';
import Link from 'next/link';
import SvgIconStyle from '../SvgIconStyle';

function Footer() {
  return (
    <div className="bg-[#0F1642] mt-10">
      <div className="lg:container mx-auto px-9 py-6 flex flex-col items-center text-white">
        <div className="text-center">
          <h5 className="mb-3">logo</h5>
          <ul className="flex flex-row list-none items-center my-4 w-full md:justify-end">
            {linkArray.map(({ title, url }) => (
              <li className="nav-item" key={title}>
                <Link href={url}>
                  <a className="px-3 py-2 flex items-center text-xs leading-snug text-white hover:opacity-75">
                    <span className={`ml-2 text-[1rem] hover:underline`}>{title}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-between border-t-2 border-[#ffffff12] py-4">
          <p className="text-[#D9DBE1]">© 2020 pipsville. All rights reserved</p>
          <div className="socials flex">
            <a href="#" className="">
              <SvgIconStyle src="/icons/Youtube.svg" />
            </a>
            <a href="#" className="">
              <SvgIconStyle src="/icons/Youtube.svg" />
            </a>
            <a href="#" className="">
              <SvgIconStyle src="/icons/Twitter.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
