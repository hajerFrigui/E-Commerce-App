import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Grid, Container, LinearProgress } from "@material-ui/core";

import Datatable from "../components/Datatable";

export default function Home() {
  return (
    <Grid>
      <Datatable />
    </Grid>
  );
}
