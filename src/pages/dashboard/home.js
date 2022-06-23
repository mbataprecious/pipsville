import { Container, Grid } from '@mui/material';
// layouts
import Layout from '../../layouts';
// hooks
import { useTheme } from '@mui/material/styles';
//ironSession
import pageAuth from '../../middleware/pageAuthAccess';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import StatusCard from '../../components/StatusCard';
import WithdrawalTable from '../../components/WithdrawalTable';
import { AppWelcome, AppWidgetSummary } from '../../sections/@dashboard/app';
import serializeFields from '../../helpers/serialize';
import PropTypes from 'prop-types';
import Withdrawal from '../../models/withdrawal.model';
import Transaction from '../../models/transaction.model';
import { getUserById } from '../../helpers/fetchers';
import useSWR from 'swr';

// ----------------------------------------------------------------------

Home.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------
async function handler({ req }) {
  const user = serializeFields(req.user);
  console.log('this is user', user);
  const totalEarnings = await Transaction.aggregate([
    { $match: { $and: [{ userId: user._id }, { $or: [{ type: 'daily' }, { type: 'bonus' }] }] } },
    { $group: { _id: '$userId', totalEarnings: { $sum: '$amount' } } },
  ]);
  const allApprovedInvestment = await Transaction.aggregate([
    { $match: { $and: [{ userId: user._id }, { type: 'investment' }] } },
    { $group: { _id: '$userId', totalEarnings: { $sum: '$amount' } } },
  ]);
  const totalWithdrawal = await Withdrawal.aggregate([
    { $match: { userId: user._id } },
    { $group: { _id: '$userId', totalWithdrawal: { $sum: '$amount' } } },
  ]);
  const withdrawalList = await Withdrawal.find({ userId: user._id }).lean();
  // withdrawalList.map(list=>())
  return {
    props: {
      user,
      withdrawalList,
      totalWithdrawal: totalWithdrawal.length ? totalWithdrawal[0].totalWithdrawal : 0,
      totalEarnings: totalEarnings.length ? totalEarnings[0].totalEarnings : 0,
      totalInvestment: allApprovedInvestment.length ? totalEarnings[0].totalEarnings : 0,
      fallback: {
        [`/api/user/${user._id}`]: user,
      },
    },
  };
}
Home.propTypes = {
  user: PropTypes.object,
  totalWithdrawal: PropTypes.number,
  withdrawalList: PropTypes.array,
  totalEarnings: PropTypes.number,
  totalInvestment: PropTypes.number,
};
export const getServerSideProps = pageAuth(handler);

export default function Home({ totalInvestment, user, totalWithdrawal, totalEarnings, withdrawalList }) {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  const profile = data ? data : user;
  const totalBalance = profile.accountBalance + totalInvestment;
  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user?.firstName} />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatusCard
              user={profile}
              isWalletEmpty={!(user?.wallets?.btc || user?.wallets?.usdt)}
              isVerified={user.isVerified}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Balance"
              percent={profile.accountBalance > 0 ? 0.1 : 0.0}
              total={totalBalance}
              chartColor={theme.palette.primary.main}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Withdrawal"
              percent={user.accountBalance > 0 ? 0.1 : 0.0}
              total={totalWithdrawal}
              chartColor={theme.palette.chart.blue[0]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Earnings"
              percent={user.accountBalance > 0 ? 0.1 : 0.0}
              total={totalEarnings}
              chartColor={theme.palette.chart.red[0]}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <WithdrawalTable row={withdrawalList} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
