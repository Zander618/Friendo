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

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  // const loggedInLinks = () => {
  //   return (
  //     <div>
  //       <Button>
  //         <Typography
  //           noWrap
  //           component="a"
  //           href="/dogs"
  //           sx={{
  //             mr: 2,
  //             display: { xs: "none", md: "flex" },
  //             fontFamily: "monospace",
  //             fontWeight: 700,
  //             letterSpacing: ".3rem",
  //             color: "white",
  //             textDecoration: "none",
  //           }}
  //         >
  //           Dogs
  //         </Typography>
  //       </Button>
  //       <Button>
  //         <Typography
  //           noWrap
  //           component="a"
  //           href="/meetups"
  //           sx={{
  //             mr: 2,
  //             display: { xs: "none", md: "flex" },
  //             fontFamily: "monospace",
  //             fontWeight: 700,
  //             letterSpacing: ".3rem",
  //             color: "white",
  //             textDecoration: "none",
  //           }}
  //         >
  //           Meetups
  //         </Typography>
  //       </Button>
  //       <Button>
  //         <Typography
  //           noWrap
  //           component="a"
  //           href="/locations"
  //           sx={{
  //             mr: 2,
  //             display: { xs: "none", md: "flex" },
  //             fontFamily: "monospace",
  //             fontWeight: 700,
  //             letterSpacing: ".3rem",
  //             color: "white",
  //             textDecoration: "none",
  //           }}
  //         >
  //           Locations
  //         </Typography>
  //       </Button>
  //     </div>
  //   );
  // };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            Friendo
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
            {/* insert conditional for logged in logged out links */}
            <Button>
          <Typography
            noWrap
            component="a"
            href="/dogs"
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
            Dogs
          </Typography>
        </Button>
        <Button>
          <Typography
            noWrap
            component="a"
            href="/meetups"
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
            Meetups
          </Typography>
        </Button>
        <Button>
          <Typography
            noWrap
            component="a"
            href="/locations"
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
            Locations
          </Typography>
        </Button>
          </Box>

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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/signup"
                  textAlign="center"
                >
                  Sign Up
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  // use correct restful route
                  href="/adddog"
                  textAlign="center"
                >
                  Add Dog
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
