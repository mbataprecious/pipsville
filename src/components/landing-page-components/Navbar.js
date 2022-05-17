import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { m } from 'framer-motion';

const linkArray = [
  {
    title: 'About Us',
    url: '/about',
  },
  {
    title: 'Contat Us',
    url: '/contact',
  },
  {
    title: 'FAQs',
    url: '/faq',
  },
  {
    title: 'Investment',
    url: '/services',
  },
];

const variant = {
  hidden: {
    height: 0,
    overflow: 'hidden',
  },
  visible: {
    height: 'auto',
    overflow: 'hidden',
  },
};
export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="fixed flex flex-wrap items-center justify-center px-2 py-3 bg-slate-500 mb-3 w-full z-10">
        <div className="lg:container px-4 mx-auto flex flex-wrap items-center justify-between w-full">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a className="inline-block mr-4 py-2 whitespace-nowrap">
                <img alt="logo" src="" />
              </a>
            </Link>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              type="button"
              className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none border-transparent bg-transparent lg:hidden"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!navbarOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
          <m.div
            animate={navbarOpen ? 'visible' : 'hidden'}
            initial={variant.hidden}
            variants={variant}
            className={'lg:flex flex-grow items-center flex lg:!h-auto bg-black lg:bg-transparent'}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              {linkArray.map(({ title, url }) => (
                <li className="nav-item" key={title}>
                  <Link href={url}>
                    <a className="px-3 py-2 flex items-center text-xs leading-snug text-white hover:opacity-75">
                      {/* <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i> */}
                      <span
                        className={`ml-2 text-[1.125rem] hover:text-blue-400 ${
                          router.pathname === url ? 'text-primary' : ''
                        }`}
                      >
                        {title}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}

              <li className="nav-item">
                <Link href={'/login'}>
                  <a className="px-3 py-2 flex items-center text-xs leading-snug text-white">
                    <button className="font-display text-[1rem] border-none focus:outline-none outline-none hover:bg-blue-700  p-[0.875rem] bg-primary text-white mr-3">
                      Discover more
                    </button>
                  </a>
                </Link>
              </li>
            </ul>
          </m.div>
        </div>
      </nav>
    </>
  );
}
