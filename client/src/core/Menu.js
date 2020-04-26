import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { green } from "@material-ui/core/colors";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#000000" };
  }
};

const MenuAppBar = ({ history }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="row mr-1">
      <AppBar position="static" color="inherit">
        <Toolbar>
          <div className="col-1 ml-2  text-center">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              <HomeIcon style={{ color: green[500] }} />
            </Link>
          </div>
          <div className="col-5 text-right ">
            <Typography variant="h6">
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </Typography>
          </div>
          <div className="col-5 text-left ">
            <Typography variant="h6">
              <Link
                style={currentTab(history, "/products")}
                className="nav-link"
                to="/products"
              >
                Catalog
              </Link>
            </Typography>
          </div>
          <div className="col-1  text-center">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              edge="end"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {!isAuthenticated() && (
                <React.Fragment>
                  <Link
                    style={{ color: "black" }}
                    className="nav-link"
                    to="/signin"
                  >
                    <MenuItem onClick={handleClose}>Sign In</MenuItem>
                  </Link>
                  <Link
                    style={{ color: "black" }}
                    className="nav-link"
                    to="/signup"
                  >
                    <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                  </Link>
                </React.Fragment>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <React.Fragment className="nav-item">
                  <Link
                    style={{ color: "black", position: "left" }}
                    className="nav-link"
                    to="/user/dashboard"
                  >
                    <MenuItem>My account</MenuItem>
                  </Link>
                  <Link
                    style={{ color: "black" }}
                    className="nav-link"
                    to="/user/cart"
                  >
                    <MenuItem>Cart</MenuItem>
                  </Link>
                  <Link style={{ color: "black" }} className="nav-link">
                    <MenuItem
                      alignItems="center"
                      onClick={() => {
                        signout(() => {
                          history.push("/");
                        });
                      }}
                    >
                      Sign Out
                    </MenuItem>
                  </Link>
                </React.Fragment>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <React.Fragment className="nav-item">
                  <Link
                    style={{ color: "black", position: "left" }}
                    className="nav-link"
                    to="/admin/dashboard"
                  >
                    <MenuItem>My account</MenuItem>
                  </Link>
                  <Link style={{ color: "black" }} className="nav-link">
                    <MenuItem
                      alignItems="center"
                      onClick={() => {
                        signout(() => {
                          history.push("/");
                        });
                      }}
                    >
                      Sign Out
                    </MenuItem>
                  </Link>
                </React.Fragment>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(MenuAppBar);
