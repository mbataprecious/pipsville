import { Container, Typography, Box, Grid } from '@mui/material';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import WalletCards from '../../components/WalletCard';
import { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { FaBitcoin } from 'react-icons/fa';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

PageThree.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettings();
  const [loading, isLoading] = useState(false);
  const [ethError, setEthError] = useState(false);
  const [addresses, setAddresses] = useState({
    eth: '',
    btc: '',
  });

  const validateEthereum = () => {
    const regex = /^0x[a-fA-F0-9]{40}$/g;
    if (addresses.eth.match(regex)) {
      setEthError(false);
    } else {
      setEthError(true);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddresses((adrs) => ({
      ...adrs,
      [name]: value,
    }));
  };
  return (
    <Page title="wallet">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4">Wallet Address</Typography>
        <Typography variant="body2" mb={3}>
          Edit wallet Addresses and save changes, Please note that we are not responsible if payment is being made to
          the wrong Wallet Address. make sure your wallet address is CORRECT before requesting for withdrawal.
        </Typography>
        <Typography variant="body2" mb={1}>
          Last Updated:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <WalletCards
              name="eth"
              error={ethError}
              onChange={handleChange}
              price="31,045.00"
              title="Ethereum(ETH)(24h)"
              onKeyUp={validateEthereum}
              value={addresses.eth}
              leadIcon={
                <FaEthereum
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <WalletCards
              name="btc"
              disabled
              onChange={handleChange}
              price=""
              title="Bitcoin(BTC)(24h) Comming soon"
              leadIcon={
                <FaBitcoin
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              }
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LoadingButton size="large" sx={{ mt: 3 }} type="submit" variant="contained" loading={loading}>
            Update Wallet
          </LoadingButton>
        </Box>
      </Container>
    </Page>
  );
}
