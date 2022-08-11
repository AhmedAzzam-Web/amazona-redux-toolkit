import React, { useState, useEffect } from "react";
import logo from "../public/logo.svg";
import styles from "../styles/Navbar.module.css";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "@mui/icons-material/Login";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  MenuItem,
  Link,
  Switch,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  Badge,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { removeUser } from "../utils/features/userSlice/userController";
import { clearCart } from "../utils/features/cartSlice/cartController";
import { removeShippingData } from "../utils/features/shippingSlice/shippingController";
import { removePaymentMethod } from "../utils/features/paymentSlice/paymentController";
import { toggleDarkMode } from "../utils/features/darkSlice/dark";
import { getError } from "../utils/error";
import axios from "axios";
import { useSnackbar } from "notistack";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#e1dfdf", 0.25),
  "&:hover": {
    backgroundColor: alpha("#e1dfdf", 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
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
    backgroundColor: "rgba(200 239 78 / 85%)",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    display: "flex",
    flexGrow: 1,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
    },
    [theme.breakpoints.up("md")]: {
      width: "20ch",
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

const userPages = ["profile", "order history"];
const navLinks = ["home", "shop", "about", "contact"];

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems } = useSelector((store) => store.cart);
  const { userData } = useSelector((store) => store.user);
  const { isDark } = useSelector((store) => store.dark);
  const { enqueueSnackbar } = useSnackbar();
  const [cartItemsLength, setCartItemsLength] = useState(0);

  useEffect(() => {
    cartItems && setCartItemsLength(cartItems.length);
    return () => {};
  }, [cartItems]);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    userData ? setUserName(userData.name) : setUserName("");
    return () => {};
  }, [userData]);

  const logoutHandler = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
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
  }, []);

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
    query && router.push(`/search?searchQuery=${query}`);
  };

  const sidebarComponent = () => (
    <Box
      role="presentation"
      sx={{ minWidth: { sm: "270px" }, paddingTop: "0", paddingBottom: "0" }}
    >
      <List>
        <ListItem
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="h3">
            Search Products
          </Typography>
          <IconButton
            aria-label="close"
            onClick={toggleDrawer(false)}
            sx={{ display: "flex", alignItems: "center", order: "0" }}
          >
            <CancelIcon />
          </IconButton>
        </ListItem>

        <form onSubmit={handleSubmit}>
          <Search>
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

        <Divider light sx={{ margin: "2rem 0 0.2rem" }} />

        <ListItem
          sx={{ justifyContent: "center", paddingTop: "0", paddingBottom: 0 }}
        >
          <Typography variant="h5" component="h4" sx={{margin: '0.7rem 0'}}>
            Links
          </Typography>
        </ListItem>
        <Divider light />
        {navLinks.map((link) => (
          <NextLink
            key={link}
            href={`${link === "home" ? "/" : `/${link.toLowerCase()}`}`}
            passHref
          >
            <ListItem button component={"a"} onClick={toggleDrawer(false)}>
              <ListItemText primary={link} className="link"></ListItemText>
            </ListItem>
          </NextLink>
        ))}

        <Divider />

        <ListItem
          sx={{ justifyContent: "center", paddingTop: "0", paddingBottom: 0 }}
        >
          <Typography variant="h5" component="h4" sx={{margin: '0.7rem 0'}}>
            Shopping by category
          </Typography>
        </ListItem>
        <Divider light />
        {categories.map((category) => (
          <NextLink
            key={category}
            href={`/search?category=${category.toLowerCase()}`}
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userPages.map((page) => (
        <MenuItem
          key={page}
          onClick={() => {
            handleMenuClose();
            router.push(`/${page.split("").join("").replace(" ", "-")}`);
          }}
        >
          {page}
        </MenuItem>
      ))}
      <MenuItem onClick={logoutHandler}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <NextLink href="/cart" passHref>
        <MenuItem sx={{ padding: "0 20px" }}>
          <IconButton
            size="large"
            aria-label="show cart products"
            color="inherit"
          >
            <Badge badgeContent={cartItemsLength} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </NextLink>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show loved prodcuts"
          color="inherit"
        >
          <Badge badgeContent={17} color="primary">
            <FavoriteBorderOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Loved Products</p>
      </MenuItem>

      {userName ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <NextLink href="/login" passHref>
          <MenuItem sx={{ padding: "0 20px" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <LoginIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>
        </NextLink>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
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
              <Box className="flexbox">
                <Image src={logo} alt="e-commerce" height="30px" />
                <Typography
                  variant="h6"
                  noWrap
                  component="h4"
                  className={styles.brand}
                >
                  Plantly.
                </Typography>
              </Box>
            </Link>
          </NextLink>
        </Box>

        <Drawer anchor="left" open={sidebar} onClose={toggleDrawer(false)}>
          {sidebarComponent()}
        </Drawer>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <nav aria-label="Navigation Links">
            <List className={styles.navigationLinks}>
              {navLinks.map((link) => (
                <NextLink
                  key={link}
                  href={`${link === "home" ? "/" : `/${link}`}`}
                  passHref
                >
                  <ListItem button component={"a"} className={styles.navLink}>
                    <ListItemText primary={link}></ListItemText>
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </nav>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <SunOrMoon
            checked={isDark}
            onChange={() => dispatch(toggleDarkMode())}
          />

          <IconButton
            size="large"
            aria-label="search products"
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <SearchIcon />
          </IconButton>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <NextLink href="/cart" passHref>
              <IconButton
                size="large"
                aria-label="show cart products"
                color="inherit"
              >
                <Badge badgeContent={cartItemsLength} color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </NextLink>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="primary">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </IconButton>

            {userName ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="current user details profile, orders"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
        </Box>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
