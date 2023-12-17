import React from "react";
import { linkArray } from "./landingUtils";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#0F1642] mt-10">
      <div className="lg:container mx-auto px-9 py-6 flex flex-col items-center text-white">
        <div className="text-center">
          <img
            alt="logo"
            src="/logo/Pipsville.svg"
            className="w-[50px] mx-auto"
          />
          <ul className="flex flex-row list-none items-center my-4 w-full md:justify-end">
            {linkArray.map(({ title, url }) => (
              <li className="nav-item" key={title}>
                <Link
                  className="px-3 py-2 flex items-center text-xs leading-snug text-white hover:opacity-75"
                  href={url}
                >
                  <span className={`ml-2 text-[1rem] hover:underline`}>
                    {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-between border-t-2 border-[#ffffff12] py-4">
          <p className="text-[#D9DBE1]">
            © 2020 pipsville. All rights reserved
          </p>
          <div className="socials flex">
            <a
              href="https://t.me/PipsvilleCrypto_support"
              className="text-white"
            >
              <FaTelegram className="w-[30px] h-[30px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
