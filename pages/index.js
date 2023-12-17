import Section5 from '../components/landing-page-components/Section5';
import HeaderSection from '../components/landing-page-components/HeaderSection';
import Section2 from '../components/landing-page-components/Section2';
import Section4 from '../components/landing-page-components/section4';
import Section6 from '../components/landing-page-components/section6';
import Section7 from '../components/landing-page-components/Section7';
import Section8 from '../components/landing-page-components/section8';
import Section9 from '../components/landing-page-components/Section9';
import Section10 from '../components/landing-page-components/Section10';
import Section11 from '../components/landing-page-components/Section11';
import Footer from '../components/landing-page-components/Footer';

// ----------------------------------------------------------------------

export default function Index() {
  // useEffect(() => {
  //   if (router.pathname == '/') {
  //     router.push('/dashboard/one');
  //   }
  // });

  return (
    <>
      <HeaderSection />
      <Section2 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
      <Section10 />
      <Section11 />
      <Footer />
    </>
  );
}
