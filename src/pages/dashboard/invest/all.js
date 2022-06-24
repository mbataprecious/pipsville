import { Container, Typography, Grid } from '@mui/material';
// layouts
import Layout from '../../../layouts';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import InvestmentTable from '../../../components/invtPaginate';
import PropTypes from 'prop-types';
import serializeFields from '../../../helpers/serialize';
import Investment from '../../../models/investment.model';
// ----------------------------------------------------------------------
import pageAuth from '../../../middleware/pageAuthAccess';
// ----------------------------------------------------------------------
async function handler({ req }) {
  const user = serializeFields(req.user);
  const allInvestments = serializeFields(
    await Investment.find({ userId: user._id, transactionId: { $exists: true } }).lean()
  );
  return {
    props: {
      user,
      allInvestments,
      fallback: {
        [`/api/user/${user._id}`]: user,
      },
    },
  };
  // return {
  //   props: { user },
  // };
}
AllInvestments.propTypes = {
  user: PropTypes.object,
  allInvestments: PropTypes.array,
};
export const getServerSideProps = pageAuth(handler);

AllInvestments.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AllInvestments({ user, allInvestments }) {
  const { themeStretch } = useSettings();
  console.log(allInvestments);
  return (
    <Page title="investment list">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <InvestmentTable rows={allInvestments} />
      </Container>
    </Page>
  );
}
