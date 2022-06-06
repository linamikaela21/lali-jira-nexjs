import { Box } from "@mui/material";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { NavBar, SideBar } from "../ui";

interface Props {
  title?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ title = "Open Jira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Lina Gutierrez Arribas"></meta>
        <meta name="description" content={`Information about ${title}`}></meta>
        <meta name="keywords" content={`${title}, jira`}></meta>
        <meta property="og:title" content={`Information about ${title}`} />
        <meta
          property="og:description"
          content={`This is the page of Open Jira`}
        />
      </Head>
      <NavBar />
      <SideBar />
      <Box sx={{ padding: "20px 30px" }}>{children}</Box>
    </Box>
  );
};
