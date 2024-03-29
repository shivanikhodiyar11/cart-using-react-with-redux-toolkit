import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({ reducer: "Name" });
store.getState();

store.dispatch({ type: "conter/increment" });
