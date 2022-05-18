import React from 'react';

import tradeImg from '../../assets/img/bg6.png';
import Image from 'next/image';
import Script from 'next/script';

function Section6() {
  return (
    <div className="relative mt-6 pb-20">
      <Image src={tradeImg} alt="background" layout="fill" objectFit="cover" priority />
      <div className="relative flex flex-col items-center lg:container px-4 mx-auto">
        <h5 className="text-[#fff] text-center w-[42rem]">
          Save time.<span className="text-[#EA5455]">Get higher return.</span>
          Multiply wealth.
        </h5>
        <div className="flex flex-col md:flex-row md:justify-between mt-[12rem] p-10 md:p-14 w-full">
          <div className="flex-1">
            <div className="relative">
              <div className="bg-[#1081E8] rotate-3 absolute rounded-lg"> </div>
              <div className="rounded-lg">
                <div className="tradingview-widget-container">
                  <div className="tradingview-widget-container__widget"> </div>
                  <div className="tradingview-widget-copyright">
                    <a
                      href="https://www.tradingview.com/markets/cryptocurrencies/prices-all/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="blue-text">Cryptocurrency Markets</span>
                    </a>{' '}
                    by TradingView
                  </div>
                  <Script
                    id="s"
                    src="https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `
  {
  "width": "100%",
  "height": "100%",
  "defaultColumn": "overview",
  "screener_type": "crypto_mkt",
  "displayCurrency": "USD",
  "colorTheme": "light",
  "locale": "en",
  "isTransparent": true
}
  `,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1"> </div>
        </div>
      </div>
    </div>
  );
}

export default Section6;
