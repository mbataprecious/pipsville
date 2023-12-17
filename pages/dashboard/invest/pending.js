import { Container, Typography, Grid } from '@mui/material';
// layouts
import Layout from '../../../layouts';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import PendingCards from '../../../components/PendingCards';
import plans from '../../../helpers/plans';
import pageAuth from '../../../middleware/pageAuthAccess';
import PropTypes from 'prop-types';
import serializeFields from '../../../helpers/serialize';
import Investment from '../../../models/investment.model';

// ----------------------------------------------------------------------

async function handler({ req }) {
  const user = serializeFields(req.user);
  console.log('this is user', user);
  const pendingInvestments = serializeFields(
    await Investment.find({ userId: user._id, status: 'pending', transactionId: { $exists: false } }).lean()
  );
  return {
    props: {
      user,
      pendingInvestments,
      fallback: {
        [`/api/user/${user._id}`]: user,
      },
    },
  };
  // return {
  //   props: { user },
  // };
}
export const getServerSideProps = pageAuth(handler);
Pending.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
Pending.propTypes = {
  user: PropTypes.object,
  pendingInvestments: PropTypes.array,
};
export default function Pending({ user, pendingInvestments }) {
  const { themeStretch } = useSettings();
  const allPendings = pendingInvestments.map(({ planId, ...rest }) => ({
    ...rest,
    plan: plans[planId],
  }));
  console.log('pending', pendingInvestments);
  return (
    <Page title="Page Six">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3">Pending Investment</Typography>
        <Grid container mt={3} spacing={3}>
          {!!allPendings.length &&
            allPendings.map((x) => (
              <Grid key={x._id} item xs={12} sm={6} md={4}>
                <PendingCards investment={x} user={user} />
              </Grid>
            ))}
        </Grid>
        {!allPendings.length && (
          <Typography textAlign={'center'} mt={4} color={'primary'} variant="h3">
            No Pending investments
          </Typography>
        )}
      </Container>
    </Page>
  );
}
