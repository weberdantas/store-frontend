import { Typography } from "@material-ui/core";
import Head from "next/head";
import type { NextPage } from "next";

const Page404: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Página não encontrada</title>
      </Head>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        404 - Página não encontrada
      </Typography>
    </div>
  );
};

export default Page404;
