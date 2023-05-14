import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { LinkStyling } from "../General/General";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#132850" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM Web app
          </Typography>
          {window.location.pathname == "/" && (
            <Button color="inherit">Login</Button>
          )}
          <span>
            <Link to="/dashboard" style={LinkStyling}>
              <Button color="inherit">DASHBOARD</Button>
            </Link>
            <Link to="/adduser" style={LinkStyling}>
              {localStorage.getItem("usertype") !== "employee" && (
                <Button color="inherit">Add User</Button>
              )}
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
