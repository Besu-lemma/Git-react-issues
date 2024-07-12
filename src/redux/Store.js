// Store.js

import { configureStore } from "@reduxjs/toolkit";
import githubReducer from "./githubSlice";

const Store = configureStore({
  reducer: {
    github: githubReducer,
  },
});

export default Store; // Ensure you export the configured store as default
