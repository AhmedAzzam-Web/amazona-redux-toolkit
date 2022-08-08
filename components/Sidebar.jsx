import React, { useState, useEffect, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  InputBase,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import NextLink from "next/link";
import { getError } from "../utils/error";
import axios from "axios";

const navLinks = ["Home", "Shop", "About", "Contact"];

const Sidebar = ({ values: { toggleDrawer } }) => {
  const [query, setQuery] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
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
  }, [categories]);

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    query && router.push(`/search?searchQuery=${query}`);
  };

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

  return (
    <Box role="presentation" sx={{ minWidth: { sm: "270px" } }}>
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
          <Search sx={{ marginTop: "0.5rem" }}>
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

        <ListItem sx={{ justifyContent: "center" }}>
          <Typography variant="h6" component="h4">
            Links
          </Typography>
        </ListItem>
        <Divider light />
        {navLinks.map((link) => (
          <NextLink
            key={link}
            href={`${link === "Home" ? "/" : `/${link.toLowerCase()}`}`}
            passHref
          >
            <ListItem button component={"a"} onClick={toggleDrawer(false)}>
              <ListItemText primary={link}></ListItemText>
            </ListItem>
          </NextLink>
        ))}

        <Divider />

        <ListItem sx={{ justifyContent: "center" }}>
          <Typography variant="h6" component="h4">
            Shopping by category
          </Typography>
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
};

export default React.memo(Sidebar);
