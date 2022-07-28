import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
  createStyles,
  alpha,
  Theme,
  makeStyles
} from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterText: {
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    },
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: "8px",
      marginRight: theme.spacing(2)
    },
    title: {
      [theme.breakpoints.down("md")]: {
        fontSize: "22px"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "15vw"
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch"
        }
      }
    },
    flexDiv: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    filters: {
      display: "flex",
      alignItems: "center"
    }
  })
);

const SearchAppBar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = window.location;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.flexDiv}>
            <Typography className={classes.title} variant="h4" noWrap>
              Latest News
            </Typography>
            <div className={classes.filters}>
              {location.pathname === "/home" ? 
              <>
              <Typography variant="h6" noWrap className={classes.filterText}>
                Settings
              </Typography>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={()=>navigate("/settings")}
              >
                <SettingsIcon />
              </IconButton>
              </>
              :
              <>
              <Typography variant="h6" noWrap className={classes.filterText}>
                Home
              </Typography>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={()=>navigate("/home")}
              >
                <HomeIcon />
              </IconButton>
              </>
}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default SearchAppBar;