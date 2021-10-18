import React from "react";
import { Grid } from "../grid";
import ListItem from "./ListItem";
import StyleSheet from "./list.module.scss";

const List = ({ titles = [], children }) => {
  return (
    <div className={StyleSheet.list}>
      <Grid
        numberOfcolumns={titles.length}
        columnGap={0}
        padding={0}
        rowGap={0}
      >
        {titles.map((title, index) => (
          <ListItem text={title} title key={index} />
        ))}
        {children}
      </Grid>
    </div>
  );
};

export default List;
