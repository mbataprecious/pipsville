import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, Box, CardContent } from '@mui/material';
import { height } from '@mui/system';
import { FaEthereum } from 'react-icons/fa';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(() => ({
  height: '100%',
  textAlign: 'left',
  alignItems: 'center',
}));

const MsgWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));
// ----------------------------------------------------------------------

PlanCards.propTypes = {
  isWalletEmpty: PropTypes.bool,
  isVerified: PropTypes.bool,
};
function PlanCards() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">Bronze Plan</Typography>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box
            sx={{
              color: 'primary.lighter',
            }}
          >
            <FaEthereum
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Box>

          <Typography paddingLeft={2} align={"center"} variant="subtitle2">
            Ethereum(ETH)(24h)
          </Typography>
        </Box>
        <Typography color={(theme) => theme.palette.primary.main} variant="p">
          Daily Bonus
        </Typography>
        <Typography variant="h5">1.</Typography>
      </CardContent>
    </RootStyle>
  );
}

export default PlanCards;
