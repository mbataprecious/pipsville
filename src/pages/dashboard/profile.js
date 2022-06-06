import { Container, Typography, Grid, Stack } from '@mui/material';

// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import ProfileBlock from '../../components/ProfileBlock';
import PasswordBlock from '../../components/PasswordBlock';
import PictureUpdateBlock from '../../components/PictureUpdateBlock';
import NotificationBlock from '../../components/NotificationBlock';

// ----------------------------------------------------------------------

PageThree.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Page Three">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={3}>
            <PictureUpdateBlock />
          </Grid>
          <Grid item sm={12} md={4.5}>
            <ProfileBlock />
          </Grid>
          <Grid item sm={12} md={4.5}>
            <PasswordBlock />
          </Grid>
          <Grid item sm={12} md={3}>
            <></>
          </Grid>
          <Grid item sm={12} md={9}>
            <NotificationBlock />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
