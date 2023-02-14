import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import { UserContext } from "./Context";
import { Link } from "react-router-dom";

function ResponsiveAppBar() {
  const { logoutUser, loggedIn } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  const loggedInLinks = () => {
    return (
      <div>
        <Button>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Link to="/dogs">Dogs</Link>
          </Typography>
        </Button>
        <Button>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Link to="/meetups">Meetups</Link>
          </Typography>
        </Button>
        <Button>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Link to="/locations">Locations</Link>
          </Typography>
        </Button>
      </div>
    )
  };

  const loggedOutLinks = () => {
    return (
      <div>
  <h4>Please sign in or sign up to begin making friends. </h4>
      </div>
    );
  };

  const loggedOutMenuItems = () => {
    return (
      <div>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            variant="h6"
            noWrap
            textAlign="center"
          >
            <Link to="/signup">Sign Up</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            variant="h6"
            noWrap
            textAlign="center"
          >
            <Link to="/login">Login</Link>
          </Typography>
        </MenuItem>
      </div>
    );
  };
  
  const loggedInMenuItems = () => {
    return (
      <div>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            variant="h6"
            noWrap
            // use correct restful route
            textAlign="center"
          >
            <Link to="/adddog">Add Dog</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            variant="h6"
            noWrap
            // use correct restful route
            textAlign="center"
          >
            <Link to="/myprofile">My Profile</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            onClick={handleLogout}
            variant="h6"
            noWrap
            // use correct restful route
            textAlign="center"
          >
            Log Out
          </Typography>
        </MenuItem>
      </div>
    );
  };
  

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      navigate("/login");
      logoutUser();
    });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">Friendo</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          {loggedIn ? loggedInLinks() : loggedOutLinks()}
          <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Friendo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            ></Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Add SRC" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {loggedIn ? loggedInMenuItems() : loggedOutMenuItems()}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
