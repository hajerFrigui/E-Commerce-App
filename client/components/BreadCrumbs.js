import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const SimpleBreadcrumbs = ({ title, item1, item2 }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick}>
        {title}
      </Link>
      <Link
        color="inherit"
        href="/getting-started/installation/"
        onClick={handleClick}
      >
        {item1}
      </Link>
      <Typography color="textPrimary">{item2}</Typography>
    </Breadcrumbs>
  );
};

export default SimpleBreadcrumbs;
