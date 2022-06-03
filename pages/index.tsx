import { Card, CardHeader, Grid, CardContent } from "@mui/material";
import type { NextPage } from "next";
import { Layout } from "../components/layout";
import { EntriesList, NewEntry } from "../components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - Jira">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(90vh)", paddingY: 2 }}>
            <CardHeader title="Pending"></CardHeader>
          <NewEntry />
            <CardContent>
              <EntriesList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(90vh)" }}>
            <CardHeader title="In Process"></CardHeader>
            <CardContent>
              <EntriesList status="in-process" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(90vh)" }}>
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
