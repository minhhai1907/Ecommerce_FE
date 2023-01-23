import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import calTotalReports from "../../../utils/calReport";
import { fNumber } from "../../../utils/numberFormat";

export default function TotalCustomers({ totalCustomers }) {
  const results = calTotalReports(totalCustomers, "count");
  console.log(results);
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL CUSTOMERS
            </Typography>
            <Stack direction="row" alignItems="flex-end" spacing={1}>
              <Typography color="textPrimary" variant="h4">
                {results?.count}
              </Typography>
              {results?.totalLastMonth && (
                <Typography color="textPrimary" variant="body">
                  /{results?.totalLastMonth}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {results?.totalLastMonth > results?.count ? (
            <ArrowDownwardIcon color="error" />
          ) : (
            <ArrowUpwardIcon color="success" />
          )}

          <Typography
            color={
              results?.totalLastMonth > results?.count ? "error" : "success"
            }
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {fNumber(results?.percent)} %
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
