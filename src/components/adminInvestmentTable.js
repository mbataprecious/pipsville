import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Label from './Label';
import { fDate } from '../utils/formatTime';
import { fCurrency } from '../utils/formatNumber';
import { useTheme } from '@mui/system';
import { sentenceCase } from 'change-case';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import plans from '../helpers/plans';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function InvestmentTable({ rows }) {
  const headCells = ['ID', 'Date', 'Coin', 'Transaction ID', 'Capital', 'email', 'Earning', 'daily count', 'status'];
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const handleActive = (row) => {
    const { _id, userId } = row;
    setLoading(true);
    axios
      .post(`/api/user/${userId._id}/invest/${_id}/approved`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err.response?.data.message);
        setLoading(false);
        if (err.response) {
          toast.error('error, pls try again');
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headCells.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!rows.length &&
            rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row._id}</TableCell>
                <TableCell align="right">{fDate(row.createdAt)}</TableCell>
                <TableCell align="right">{row.currency}</TableCell>
                <TableCell align="right">{row.capital}</TableCell>
                <TableCell align="right">{row.userId.email}</TableCell>
                <TableCell align="right">{row.transactionId}</TableCell>
                <TableCell align="right">{fCurrency((plans[row.planId].interest / 100) * row.capital)}</TableCell>
                <TableCell align="right">{row.dayCount}</TableCell>
                <TableCell align="right">
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={(row.status === 'pending' && 'warning') || (row.status === 'ended' && 'error') || 'success'}
                  >
                    {sentenceCase(row.status)}
                  </Label>
                </TableCell>
                <TableCell align="right">
                  {row.status === 'pending' ? (
                    <LoadingButton
                      onClick={() => handleActive(row)}
                      loading={loading}
                      variant="contained"
                      color="success"
                    >
                      Approve investment
                    </LoadingButton>
                  ) : (
                    <AddActive investment={row} />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

InvestmentTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

AddActive.propTypes = {
  investment: PropTypes.array.isRequired,
};
function AddActive({ investment }) {
  const { _id, userId } = investment;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleAdd = () => {
    setLoading(true);
    axios
      .post(`/api/user/${userId._id}/invest/${_id}/daily`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err.response?.data.message);
        setLoading(false);
        if (err.response) {
          toast.error('error, pls try again');
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Daily</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={4} variant="subtitle2">
            Note: This is for only active investments
          </Typography>
          <TextField onChange={handleChange} value={value} type={'number'} />
          <LoadingButton onClick={handleAdd} loading={loading} variant="contained">
            Add to daily Rio
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
