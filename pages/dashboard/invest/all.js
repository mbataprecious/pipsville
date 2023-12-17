import { Container, Typography, Grid, Modal, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
// layouts
import Layout from '../../../layouts';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import InvestmentTable from '../../../components/invtPaginate';
import PropTypes from 'prop-types';
import serializeFields from '../../../helpers/serialize';
import Investment from '../../../models/investment.model';
import axios from 'axios';
import { toast } from 'react-toastify';
// ----------------------------------------------------------------------
import pageAuth from '../../../middleware/pageAuthAccess';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------
async function handler({ req }) {
  const user = serializeFields(req.user);
  const allInvestments = serializeFields(
    await Investment.find({ userId: user._id, transactionId: { $exists: true } }).lean()
  );
  return {
    props: {
      user,
      allInvestments,
      fallback: {
        [`/api/user/${user._id}`]: user,
      },
    },
  };
  // return {
  //   props: { user },
  // };
}
AllInvestments.propTypes = {
  user: PropTypes.object,
  allInvestments: PropTypes.array,
};
export const getServerSideProps = pageAuth(handler);

AllInvestments.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '40rem',
  bgcolor: 'background.paper',
  border: '1px solid #cdcdcd',
  borderRadius: '.8rem',
  boxShadow: 24,
};

export default function AllInvestments({ user, allInvestments }) {
  const { themeStretch } = useSettings();
  const [open, setOpen] = useState(false);
  const [investments, setInvestments] = useState(allInvestments);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [topUpIvt, setTopUpIvt] = useState({});
  const handleOpen = (investment) => {
    console.log('this is my investment ', investment);
    setTopUpIvt(investment);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleTopUp = () => {
    setLoading(true);
    axios
      .put(`/api/user/${user._id}/invest/${topUpIvt._id}/topup`, { amount: user.accountBalance + topUpIvt.capital })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err.response?.data.message);
        setLoading(false);
        setUpdate((x) => !x);
        if (err.response) {
          toast.error('error, pls try again');
        } else {
          toast.error(err.message);
        }
      });
  };

  useEffect(() => {
    if (update) {
      axios
        .get(`/api/user/${user._id}/invest/all`)
        .then((res) => {
          console.log(res.data);
          setInvestments(res.data.data);
          setLoading(false);
          toast.success(res.data.message);
        })
        .catch((err) => {
          // console.log(err.response?.data.message);
          setLoading(false);
          setUpdate((x) => !x);
          if (err.response) {
            toast.error('error, pls try again');
          } else {
            toast.error(err.message);
          }
        });
    }
  });

  console.log(allInvestments);
  return (
    <Page title="investment list">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <InvestmentTable rows={investments} handleConfirmShow={handleOpen} />
      </Container>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ mt: 2, px: 4, pb: 1, borderBottom: '1px solid #cacaca' }}
            variant="h6"
            component="h2"
          >
            Top Up Investment
          </Typography>
          {user.accountBalance > 0 ? (
            <Typography id="modal-modal-description" sx={{ mt: 2, px: 4 }}>
              Glad you choose to take this step, topping up your this active investment entails using your current
              balance to reinvest which means you are investing a total of {user.accountBalance + topUpIvt.capital}
            </Typography>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2, px: 4, pb: 2 }}>
              Glad you choose to take this step but your current balance is not high enough to invest, try again later
              when your balance is up to it.
            </Typography>
          )}
          <Box className="flex justify-end" sx={{ mt: 2, px: 4, py: 2, borderTop: '1px solid #cacaca' }}>
            <Button variant="outlined" color="error" sx={{ mx: 2 }}>
              Close
            </Button>
            <LoadingButton variant="contained" loading={loading} onClick={() => handleTopUp()}>
              Accept
            </LoadingButton>
          </Box>
        </Box>
      </Modal> */}
    </Page>
  );
}
