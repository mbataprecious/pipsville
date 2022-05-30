import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, Box, CardContent } from '@mui/material';
import { height } from '@mui/system';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
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

StatusCard.propTypes = {
  isWalletEmpty: PropTypes.bool,
  isVerified: PropTypes.bool,
};

export default function StatusCard({ isWalletEmpty, isVerified }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="subtitle2">Account Status</Typography>
        <Typography variant="body2" sx={{ pb: { xs: 2, xl: 3 } }}>
          {isWalletEmpty
            ? `pls add an etherum address as this is needed for withdrawal and verification.`
            : `congrates you can now enjoy the full features of pipsville.`}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 50,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {!isVerified ? (
              <AiOutlineCheck style={{ color: '#33d06d', strokeWidth: 2 }} />
            ) : (
              <AiOutlineClose style={{ color: '#ff4842', strokeWidth: 2 }} />
            )}
          </Box>

          <Typography variant="body2">Verify Account</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 50,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <AiOutlineClose style={{ color: '#ff4842', strokeWidth: 2 }} />
          </Box>

          <Typography variant="body2">No Wallet Address</Typography>
        </Box>
      </CardContent>
    </RootStyle>
  );
}
