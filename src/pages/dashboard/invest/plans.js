import { Container, Typography, Grid } from '@mui/material';
// layouts
import Layout from '../../../layouts';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import PlanCards from '../../../components/PlanCards';
import plans from '../../../helpers/plans';

// ----------------------------------------------------------------------

PageFive.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PageFive() {
  const { themeStretch } = useSettings();

  return (
    <Page title="All Plans">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid key={plan.id} item xs={12} sm={6} md={4}>
              <PlanCards plan={plan} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
