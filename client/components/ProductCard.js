import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Image from "next/image";
import productPic from "../public/images/semoule.jpg";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "70%",
    height: "30vw",
  },
  details: {},
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "50%",
    height: "100%",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  button: {
    paddingTop: "10%",
  },
}));

const ProductCard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(52, 54));
  };
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover}>
        <Image
          alt=""
          src={productPic}
          quality={100}
          width={500}
          height={500}
          placeholder="blur"
        />
      </CardMedia>

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid item container direction="column" justify="space-between">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10%",
              }}
            >
              <Typography component="h5" variant="h5">
                Name of the product
              </Typography>
            </div>
            <Typography variant="subtitle1" color="textSecondary">
              price: .....D
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Disponibilité : .....(en repture/en stock)
            </Typography>
            <div
              style={{
                marginTop: "5%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <CheckIcon color="secondary" />
                <Typography variant="subtitle1">
                  Garantie livré ou remboursé{" "}
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <CheckIcon color="secondary" />
                <Typography variant="subtitle1">Produit de qualité </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <CheckIcon color="secondary" />
                <Typography variant="subtitle1">
                  {" "}
                  Service Client 24/7
                </Typography>
              </div>
            </div>
          </Grid>
        </CardContent>
        <div className={classes.controls}>
          <div>
            <TextField
              id="standard-number"
              label="Quantité"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className={classes.button}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleAddToCart()}
            >
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
