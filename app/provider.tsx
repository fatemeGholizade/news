"use client";
import React from "react";

import { Provider } from "react-redux";
import { store } from "app/core/store";

export const ReduxProvider = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
