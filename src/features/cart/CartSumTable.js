import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fCurrency, fNumber } from "../../utils/numberFormat";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CartSumTable({ products }) {
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Prices($)</StyledTableCell>
            <StyledTableCell align="right">Prices Sale($)</StyledTableCell>
            <StyledTableCell align="right">Quantity(PCS)</StyledTableCell>
            <StyledTableCell align="right">Total ($)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((row) => (
            <StyledTableRow key={row.productId._id}>
              <StyledTableCell component="th" scope="row">
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ minWidth: "500px" }}
                >
                  <Box sx={{ maxWidth: "100px", height: "100%" }}>
                    <img
                      src={row?.productId?.imageUrls?.[0]}
                      alt={row?.productId?.title}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Typography
                    component={Link}
                    to={`/product/${row.productId._id}`}
                    variant="subtitle2"
                    color="initial"
                  >
                    {row.productId.title}
                  </Typography>
                </Stack>
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                <Typography variant="subtitle1" color="initial">
                  {fCurrency(row.productId.price)}
                </Typography>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Typography variant="subtitle1" color="initial">
                  {fCurrency(row.productId.priceSale)}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <Typography variant="subtitle1" color="initial">
                    {fNumber(row.quantity)}
                  </Typography>
                </Stack>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="subtitle1" color="initial">
                  {fCurrency(row.quantity * row.productId.priceSale)}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
