import React from "react";
import { Box } from "@mui/system";
import NavBar from "../../components/NavBar";
import {
  Avatar,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";

const Account = () => {
  const user = useSelector((state) => state.user);

  return (
    <Box component="main" sx={{ width: "100%", height: "93vh" }}>
      <NavBar header={"Your Account"} />
      <Container>
        <Card sx={{ mt: 5 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {user.session.firstName.charAt(0)}
              </Avatar>
            }
            title={`${user.session.firstName} ${user.session.lastName}`}
          />
          <Divider />
          <CardContent sx={{ padding: "20px 30px" }}>
            <Grid
              container
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <Grid item>
                <Box>
                  <Typography>Email</Typography>
                  <Typography>{user.session.email}</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  <Typography>Website</Typography>
                  <Typography>{user.session.website}</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  <Typography>Organization</Typography>
                  <Typography>{user.session.organisation}</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  <Typography>Account Created</Typography>
                  <Typography>
                    {moment.utc(user.session.createdAt).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Account;
