import React from 'react'
import LazyLoadModule from "../../lazy-load/lazy-load.component";

const routes = [
  {
    path: "/tacos",
    component: props => (
      <LazyLoadModule {...props} resolve={() => import("./modules/someApp")} />
    )
  }
];