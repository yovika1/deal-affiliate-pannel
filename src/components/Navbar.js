import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ListIcon from "@mui/icons-material/List";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ mr: 4 }}>
          Affiliate Admin
        </Typography>

        <Box sx={{ display: "flex" }}>
          <List sx={{ display: "flex" }}>
            <ListItem
              component={Link}
              to="/dashboard"
              sx={{ color: "white", width: "auto" }}
              button
            >
              <ListItemIcon sx={{ color: "white" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem
              component={Link}
              to="/SkincareGuideEditor"
              sx={{ color: "white", width: "auto" }}
              button
            >
              <ListItemIcon sx={{ color: "white" }}>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Coupens" />
            </ListItem>

            <ListItem
              component={Link}
              to="/manage-blogs"
              sx={{ color: "white", width: "auto" }}
              button
            >
              <ListItemIcon sx={{ color: "white" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Blogs" />
            </ListItem>

            <ListItem
              component={Link}
              to="/logout"
              sx={{ color: "white", width: "auto" }}
              button
            >
              <ListItemIcon sx={{ color: "white" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
