import { useContext } from "react";
import { UIContext } from "../context/ui";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export const NavBar = () => {
  const { openSideMenu } = useContext( UIContext );

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" passHref>
          <Container
            sx={{
              display: "flex",
            }}
          >
            <Image src="/logo.svg" alt="Lali JIRA" width={38} height={38} />
            <Typography style={{ margin: "0px 0 0 20px" }} variant="h4">
              Lali JIRA
            </Typography>
          </Container>
        </Link>
        <IconButton>
          <MenuRoundedIcon
            style={{ margin: "0px 10px" }}
            sx={{ fontSize: 40 }}
            onClick={openSideMenu}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
