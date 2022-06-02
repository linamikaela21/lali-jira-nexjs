import { Card, CardHeader, Grid, CardContent } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layout";
import { EntriesList, NewEntry } from "../components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 110px)" }}>
            <CardHeader title="Pending"></CardHeader>
          <NewEntry />
            <CardContent>
              <EntriesList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 110px)" }}>
            <CardHeader title="In Process"></CardHeader>
            <CardContent>
              <EntriesList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 110px)" }}>
            <CardHeader title="Completed"></CardHeader>
            <CardContent>
              <EntriesList status="completed" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
