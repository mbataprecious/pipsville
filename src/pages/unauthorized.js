// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

// hooks
//import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import notVerified from '../assets/img/notVerified.png';

//layout
import Layout from '../layouts';

// sections
// import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {},
}));

const Img = styled('img')((theme) => ({
  width: '90%',
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
}));

// ----------------------------------------------------------------------
Login.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Login() {
  //   const smUp = useResponsive('up', 'sm');

  //   const mdUp = useResponsive('up', 'md');

  return (
    <Page title="unathorized">
      <Container>
        <RootStyle>
          <Typography mb={3} variant="h4">
            {' '}
            You have not been verified
          </Typography>
          <Typography variant="body1"> Check your mail for the verification link</Typography>
          <Img src={notVerified} />
        </RootStyle>
      </Container>
    </Page>
  );
}
