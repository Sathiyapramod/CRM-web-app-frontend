import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { LinkStyling } from "../General/General";
import useMediaquery from "../hooks/UseMediaquery";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function Appbar() {
  const [isMenuToggled, setMenuToggled] = useState(false);
  const isDesktop = useMediaquery("(min-width:768px)");

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isDesktop ? (
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
                {localStorage.getItem("usertype") === "admin" && (
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
      ) : (
        <AppBar position="static" sx={{ backgroundColor: "#132850" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CRM Web app
            </Typography>
            <Button onClick={() => setMenuToggled(!isMenuToggled)}>
              <GridMoreVertIcon />
            </Button>
            {window.location.pathname == "/" && (
              <Button color="inherit">Login</Button>
            )}
            {!isDesktop && !isMenuToggled && (
              <>
                <span className="toggled-menu">
                  <span>
                    <Button
                      variant="text"
                      onClick={() => {
                        setMenuToggled(!isMenuToggled);
                      }}
                    >
                      <CloseOutlinedIcon />
                    </Button>
                  </span>
                  <Link to="/dashboard" style={LinkStyling}>
                    <Button color="inherit">DASHBOARD</Button>
                  </Link>
                  <Link to="/adduser" style={LinkStyling}>
                    {localStorage.getItem("usertype") === "admin" && (
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
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}
