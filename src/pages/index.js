import Section5 from '../components/landing-page-components/Section5';
import HeaderSection from '../components/landing-page-components/HeaderSection';
import Section2 from '../components/landing-page-components/Section2';
import Section4 from '../components/landing-page-components/section4';
import Section6 from '../components/landing-page-components/section6';

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
    </>
  );
}
