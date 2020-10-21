import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, EmptyLayout } from "./layouts";

// Route Views
import LoginView from "./views/LoginView.js";

import ItemsOverview from "./views/ItemsOverview";
import ItemDetail from "./views/ItemDetail.js";

export default [
  {
    path: "/login",
    exact: true,
    layout: EmptyLayout,
    component: LoginView
  },
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/items" />
  },
  {
    path: "/items",
    exact: true,
    admin: true,
    layout: DefaultLayout,
    component: ItemsOverview
  },
  {
    path: "/items/:itemId",
    exact: true,
    admin: true,
    layout: DefaultLayout,
    component: ItemDetail
  }
];