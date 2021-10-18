import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers/reducers";

// eslint-disable-next-line
const configure = () =>
  configureStore({
    reducer,
  });

export default configure;
