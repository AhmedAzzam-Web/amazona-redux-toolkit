import React from "react";
import { Navbar } from "./imports";
import styles from "../styles/Header.module.css";
import { Box, Grid, Typography } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Header = () => {
  return (
    <>
      <Box className={styles.headerInfo}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              className={styles.alignFlex}
              sx={{ justifyContent: { xs: "center", sm: "inherit" } }}
            >
              <PhoneInTalkOutlinedIcon className={styles.icon} />
              <Typography
                variant="subtitle1"
                component="span"
                className={styles.headerIconDetails}
              >
                (833) 407-0747
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "flex-end",
            }}
            sm={6}
          >
            <Box className={styles.alignFlex}>
              <LocationOnOutlinedIcon className={styles.icon} />
              <Typography
                variant="subtitle1"
                component="span"
                className={styles.headerIconDetails}
              >
                Store Location: California | BC | Ontario
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Navbar />
    </>
  );
};

export default Header;
