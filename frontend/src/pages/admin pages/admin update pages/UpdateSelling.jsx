import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import { mainListItems, secondaryListItems } from "../listItems";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();
export default function UpdateSelling(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [sellingRecord, setSellingRecord] = useState(null);
  const [customArray, setCustomArray] = useState([]);
    
      const toggleDrawer = () => {
        setOpen(!open);
      };

      const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        console.log("User details cleared from session storage");
        navigate("/");
      };

      useEffect(() => {
        const fetchSellingRecord = async () => {
          try {
            const response = await axios.get(`/api/selling/${sellingId}`);
            setSellingRecord(response.data);
            setCustomArray(response.data[0]?.customArray || []);
          } catch (error) {
            console.error("Error fetching selling record", error);
          }
        };
    
        fetchSellingRecord();
      }, [sellingId]);

    return (
        <section>

        </section>
    )
}