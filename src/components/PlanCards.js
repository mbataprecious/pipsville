import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button, Card, Box, CardContent } from '@mui/material';
import { FaEthereum } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { LoadingButton } from '@mui/lab';
import { capitalCase } from 'change-case';
import numeral from 'numeral';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(() => ({
  height: '100%',
  width: '100%',
  textAlign: 'left',
  alignItems: 'center',
}));

// ----------------------------------------------------------------------
//{ plan: { minimum, maximum, name, id, interest }}
PlanCards.propTypes = {
  plan: PropTypes.object,
};
function PlanCards({ plan: { minimum, maximum, name, id, interest } }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setisSubmitting] = useState(false);
  const handleToggle = () => setOpen((x) => !x);
  const handleAmtChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };
  return (
    <RootStyle>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">{`${capitalCase(name)} Plan`}</Typography>
        <Box
          sx={{
            display: 'flex',
            marginTop: '1.5rem',
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

          <Typography paddingLeft={2} align={'center'} variant="subtitle2">
            Ethereum(ETH)(24h)
          </Typography>
        </Box>
        <Box>
          <Typography marginTop={3} color={(theme) => theme.palette.primary.main} variant="body2">
            Daily Bonus
          </Typography>
          <Typography variant="h5">{`${numeral(interest).format('0.00')}%`}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography marginTop={3} color={(theme) => theme.palette.primary.main} variant="body2">
              Minimum Deposit
            </Typography>
            <Typography variant="subtitle2">{`${numeral(minimum).format('0,0.00')}USD`}</Typography>
          </Box>

          <Box>
            <Typography marginTop={3} color={(theme) => theme.palette.primary.main} variant="body2">
              Maximum Deposit
            </Typography>
            <Typography variant="subtitle2">{`${numeral(maximum).format('0,0.00')}USD`}</Typography>
          </Box>
        </Box>
        <Box marginTop={3}>
          <Button
            sx={{
              boxShadow: 'none',
              ...(open ? { margin: '0 auto', display: 'block' } : {}),
              'MuiButton-startIcon': {
                margin: 0,
              },
            }}
            fullWidth={!open}
            size="medium"
            variant={open ? 'outlined' : 'contained'}
            onClick={handleToggle}
            startIcon={open ? <FaChevronLeft /> : <></>}
          >
            {!open && 'Invest'}
          </Button>
          {open && (
            <>
              <TextField
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                variant="outlined"
                label="amount"
                type="number"
                value={amount}
                onChange={handleAmtChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <LoadingButton
                fullWidth
                size="medium"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                disabled={!(parseInt(amount) >= minimum && parseInt(amount) <= maximum)}
                loading={isSubmitting}
              >
                Proceed
              </LoadingButton>
            </>
          )}
        </Box>
      </CardContent>
    </RootStyle>
  );
}

export default PlanCards;
