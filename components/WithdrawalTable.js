import { sentenceCase } from "change-case";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Link as NormLink,
  TableHead,
  CardHeader,
  TableContainer,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// utils
import { fDate } from "../utils/formatTime";
import { fCurrency } from "../utils/formatNumber";
import Scrollbar from "./Scrollbar";
import PropTypes from "prop-types";
import Link from "next/link";
import Label from "./Label";
// _mock_
// import { _appInvoices } from '../../.../_mock';
// components
AppNewInvoice.propTypes = {
  row: PropTypes.object,
};
// ----------------------------------------------------------------------

export default function AppNewInvoice({ row }) {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Withdrawal Request" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date Requested</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {row.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.currency}</TableCell>
                  <TableCell>{fCurrency(row.amount)}</TableCell>
                  <TableCell>{fDate(row.createdAt)}</TableCell>
                  <TableCell>
                    <Label
                      variant={
                        theme.palette.mode === "light" ? "ghost" : "filled"
                      }
                      color={
                        (row.status === "pending" && "warning") ||
                        (row.status === "paid" && "success")
                      }
                    >
                      {sentenceCase(row.status)}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Link href="/dashboard/withdrawal">
          <Button
            size="small"
            color="inherit"
            endIcon={<ArrowForwardIosIcon />}
          >
            View All
          </Button>
        </Link>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
