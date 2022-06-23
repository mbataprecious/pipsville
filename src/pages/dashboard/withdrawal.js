import { Container, Typography, Grid } from '@mui/material';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import WithDrawCard from '../../components/withdrawCard';
import pageAuth from '../../middleware/pageAuthAccess';
import { getUserById } from '../../helpers/fetchers';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import serializeFields from '../../helpers/serialize';
// ----------------------------------------------------------------------
async function handler({ req }) {
  const user = serializeFields(req.user);
  console.log('this is user', user);
  return {
    props: {
      user,
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
Withdrawal.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------
Withdrawal.propTypes = {
  user: PropTypes.object,
};
export default function Withdrawal({ user }) {
  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  const { themeStretch } = useSettings();
  return (
    <Page title="wallet">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4">Withdrawal/Pay wall</Typography>
        <Typography variant="body2" mb={3}>
          Select the wallet to withdraw from then enter the amount. Note, you cannot withdraw more than your account
          balance.
        </Typography>
        <Typography variant="body2" mb={1}>
          Last Updated:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <WithDrawCard user={data ? data : user} url={url} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
