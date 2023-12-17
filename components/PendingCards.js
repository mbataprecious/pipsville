import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, TextField, Card, Box, CardContent, IconButton, Modal, Stack, Button } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { toast } from 'react-toastify';
import CopyClipboard from './CopyToClipboard';
import { useRouter } from 'next/router';

//number and word transforms
import { capitalCase } from 'change-case';
import numeral from 'numeral';
//vext/Image
import Image from 'next/image';

//barcode images
import usdtImg from '../assets/img/usdt.jpg';
import btcImg from '../assets/img/btc.jpg';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(() => ({
  height: '100%',
  width: '100%',
  textAlign: 'left',
  alignItems: 'center',
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};
// ----------------------------------------------------------------------
//{ plan: { minimum, maximum, name, id, interest }}
PendingCards.propTypes = {
  investment: PropTypes.object,
  user: PropTypes.object,
};
function PendingCards({
  investment: {
    _id,
    plan: { name },
    capital,
    currency,
  },
  user,
}) {
  console.log('pending id', _id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleAmtChange = (e) => {
    const { value } = e.target;
    setTransactionId(value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    if (transactionId.length <= 5) {
      toast.error('invalid transactionId');
      return;
    }
    setIsSubmitting(true);
    axios
      .post(`/api/user/${user._id}/invest/${_id}`, { transactionId })
      .then(() => {
        router.push('/dashboard/invest/all');
        setIsSubmitting(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
        if (err.response) {
          toast.error('error, submitting transaction');
        } else {
          toast.error(err.message);
        }
      });
  };
  const handleDelete = () => {
    setIsSubmitting(true);
    axios
      .delete(`/api/user/${user._id}/invest/${_id}`)
      .then((res) => {
        setIsSubmitting(false);
        handleClose();
        router.push('/dashboard/invest/plans');
      })
      .catch((err) => {
        setIsSubmitting(false);
        if (err.response) {
          toast.error('error, submitting transaction');
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <RootStyle>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Unpaid investment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you wnt to delete this investment of deposit: {numeral(capital).format('0.00')} USD
          </Typography>
          <Stack mt={3} direction="row" spacing={3}>
            <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              color="error"
              loading={isSubmitting}
              onClick={handleDelete}
            >
              Confirm
            </LoadingButton>
            <Button size="medium" type="submit" variant="contained" color="warning" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <img
                style={{
                  width: 24,
                  height: 24,
                }}
                src={`/icons/${currency}.svg`}
                alt="coin icon"
              />
            </Box>

            {currency === 'btc' && (
              <Typography paddingLeft={2} align={'center'} variant="subtitle2">
                {` Bitcoin(BTC)${capitalCase(name)} Plan`}
              </Typography>
            )}
            {currency === 'usdt' && (
              <Typography paddingLeft={2} align={'center'} variant="subtitle2">
                {` Tether(USDT)${capitalCase(name)} Plan`}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              color: 'error.main',
              justifySelf: 'end',
            }}
          >
            <IconButton onClick={handleOpen}>
              <MdDelete
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </IconButton>
          </Box>
        </Box>

        <Typography align="center" variant="h5">{`Deposit: ${numeral(capital).format('0.00')} USD`}</Typography>

        <Typography align="center" variant="body2" color={'primary'}>
          Make payment to the Address below
        </Typography>
        <Box>
          {currency === 'btc' && <Image src={btcImg} alt="barcode" />}
          {currency === 'usdt' && <Image src={usdtImg} alt="barcode" />}
        </Box>
        <Box>
          <>
            <Typography align="center" variant="body2" color={'primary'}>
              Wallet Address
            </Typography>
            {currency === 'btc' && (
              <CopyClipboard value={'bc1qvkqqy9d5xh6asuqrsay8s7st2svcg6q45rstl5'} size="small" disabled />
            )}
            {currency === 'usdt' && (
              <CopyClipboard value={'TRBPFxHc1jFAdjEjC3ANG2KnZbFy4H6yVR'} size="small" disabled />
            )}
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              size="small"
              variant="outlined"
              placeholder="Enter transaction Id"
              type="text"
              value={transactionId}
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
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Confirm Payment
            </LoadingButton>
          </>
        </Box>
      </CardContent>
    </RootStyle>
  );
}

export default PendingCards;
