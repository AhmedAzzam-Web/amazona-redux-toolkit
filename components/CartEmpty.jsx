import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";

const CartEmpty = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom component="h1">
        Yout cart is empty
        <NextLink href="/" passHref>
          <Link sx={{marginLeft: '4px'}}>Go Shopping</Link>
        </NextLink>
      </Typography>
    </Box>
  );
};

export default CartEmpty;
