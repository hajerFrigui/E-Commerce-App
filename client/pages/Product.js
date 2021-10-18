import BreadCrumbs from "../components/BreadCrumbs";
import { Grid } from "@material-ui/core";
import ProductCard from "../components/ProductCard";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <Grid>
      <Navigation>
        <BreadCrumbs title={"Magazin"} item1={"Epicerie"} item2={"Semoule"} />
        <Grid
          container
          direction="column"
          justify="center"
          style={{
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <ProductCard />
        </Grid>
      </Navigation>
    </Grid>
  );
}
