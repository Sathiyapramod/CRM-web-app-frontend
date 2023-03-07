import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { LinkStyling } from "../General/General";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WELCOME TO CRM app
          </Typography>
          <Button color="inherit">Login</Button>
          <Link to="/" style={LinkStyling}>
            <Button color="inherit">HOME</Button>
          </Link>
          <Link to="/adduser" style={LinkStyling}>
            <Button color="inherit">Add User</Button>
          </Link>
          <Button color="inherit" onClick={()=>{
            localStorage.clear();
            window.location.href="/";
          }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
