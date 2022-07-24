import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/Navbar.module.css";
import NextLink from "next/link";
import {
  AppBar,
  MenuItem,
  InputBase,
  Link,
  Switch,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  Badge,
  Button,
  List,
  ListItem,
  Drawer,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { removeUser } from "../utils/features/userSlice/userController";
import { clearCart } from "../utils/features/cartSlice/cartController";
import { removeShippingData } from "../utils/features/shippingSlice/shippingController";
import { removePaymentMethod } from "../utils/features/paymentSlice/paymentController";
import { useSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";
import { getError } from "../utils/error";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#ffffff", 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "rgba(0, 0, 0, 0.54)",
  padding: theme.spacing(1 + "1px", 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  order: "1",
  cursor: "pointer",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "0px 4px 4px 0px",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    display: "flex",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
  },
}));

const SunOrMoon = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const userPages = ["Profile", "Order History"];

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { cartItems } = useSelector((store) => store.cart);
  const { userData } = useSelector((store) => store.user);

  const { resolvedTheme, setTheme } = useTheme();

  const [isDark, setIsDark] = useState(true);
  const [cartItemsLength, setCartItemsLength] = useState();

  useEffect(() => {
    resolvedTheme === "light" ? setIsDark(false) : setIsDark(true);
    return () => {};
  }, [resolvedTheme]);

  useEffect(() => {
    cartItems && setCartItemsLength(cartItems.length);
    return () => {};
  }, [cartItems]);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    userData ? setUserName(userData.name) : setUserName("");
    return () => {};
  }, [userData]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (redirect) => {
    setAnchorElUser(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const logoutHandler = () => {
    setAnchorElUser(null);
    dispatch(removeUser());
    dispatch(clearCart());
    dispatch(removeShippingData());
    dispatch(removePaymentMethod());
    router.push("/");
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar]);

  const [sidebar, setSidebar] = useState(false);

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSidebar(state);
  };

  const [query, setQuery] = useState(null);

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?searchQuery=${query}`);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Shopping by category</Typography>
            <IconButton aria-label="close" onClick={toggleDrawer(false)}>
              <CancelIcon />
            </IconButton>
          </Box>
        </ListItem>
        <Divider light />
        {categories.map((category) => (
          <NextLink
            key={category}
            href={`/search?category=${category}`}
            passHref
          >
            <ListItem button component={"a"} onClick={toggleDrawer(false)}>
              <ListItemText primary={category}></ListItemText>
            </ListItem>
          </NextLink>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.appbar}>
        <Toolbar className="flexbox">
          <Box className="flexbox">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <NextLink href="/">
              <Link className="link">
                <Typography
                  variant="h6"
                  noWrap
                  component="h3"
                  sx={{ display: { xs: "none", sm: "block" } }}
                  className={styles.brand}
                >
                  amazona
                </Typography>
              </Link>
            </NextLink>
          </Box>

          <Drawer anchor="left" open={sidebar} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>

          <form onSubmit={handleSubmit}>
            <Search sx={{ display: { xs: "none", md: "flex" } }}>
              <SearchIconWrapper onClick={handleSubmit}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Products"
                inputProps={{ "aria-label": "search" }}
                onChange={queryChangeHandler}
              />
            </Search>
          </form>
          <Box alignItems="center" justifyContent="center">
            <SunOrMoon
              key={isDark}
              checked={isDark}
              onChange={() =>
                setTheme(resolvedTheme === "light" ? "dark" : "light")
              }
            />
            <NextLink href="/cart" passHref>
              <Link className="link" sx={{ padding: "0 10px" }}>
                <Typography variant="body1" component="span">
                  <Badge color="secondary" badgeContent={cartItemsLength}>
                    Cart
                  </Badge>
                </Typography>
              </Link>
            </NextLink>

            {userName ? (
              <>
                <Button
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  className={styles.navbarButton}
                  onClick={handleOpenUserMenu}
                >
                  {userName}
                </Button>
                <Menu
                  id="user-menu"
                  anchorEl={anchorElUser}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handleCloseUserMenu}
                >
                  {userPages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() =>
                        handleCloseUserMenu(
                          `/${page
                            .toLowerCase()
                            .split("")
                            .join("")
                            .replace(" ", "-")}`
                        )
                      }
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={logoutHandler}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Link className="link" sx={{ padding: "0 10px" }}>
                  <Button variant="text" className={styles.userName}>
                    Login
                  </Button>
                </Link>
              </NextLink>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
