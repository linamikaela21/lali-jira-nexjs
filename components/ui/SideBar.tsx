import { useContext } from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import { UIContext } from "../context/ui";

export const SideBar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];
  return (
    <Drawer anchor="right" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box width={300}>
        <Box sx={{ padding: "1vw 3vw" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List sx={{ padding: "1vw 2vw" }}>
          {menuItems.map((text, i) => (
            <ListItem key={i} button>
              <ListItemIcon>
                {i ? <MailRoundedIcon /> : <MailRoundedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
