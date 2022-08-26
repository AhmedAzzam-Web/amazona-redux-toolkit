import { Typography } from "@mui/material";
import styles from "../styles/Logo.module.css";
const Logo = () => {
  return (
    <>
      <Typography className={styles.brand} component="h3">
        plant{" "}
      </Typography>
      <Typography color="primary" className={styles.brand} component="span">
        x
      </Typography>
    </>
  );
};

export default Logo;
