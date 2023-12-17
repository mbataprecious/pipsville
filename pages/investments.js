import PlanBody from '../components/landing-page-components/PlanBody';
import HeaderSection from '../components/landing-page-components/InvestmentHeader';

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
      <PlanBody />
      <Footer />
    </>
  );
}
