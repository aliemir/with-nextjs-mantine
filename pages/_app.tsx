import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
  AuthPage,
  LightTheme,
  MantineProvider,
} from "@pankod/refine-mantine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-nextjs-router";

import { authProvider } from "src/authProvider";
import { API_URL } from "../src/constants";

import { MantineInferencer } from "@pankod/refine-inferencer/mantine";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Refine
        routerProvider={routerProvider}
        authProvider={authProvider}
        dataProvider={dataProvider(API_URL)}
        resources={[
          {
            name: "samples",
            list: MantineInferencer,
            show: MantineInferencer,
          },
        ]}
        options={{ syncWithLocation: true }}
        notificationProvider={notificationProvider}
        LoginPage={AuthPage}
        Layout={Layout}
        catchAll={<ErrorComponent />}
      >
        <Component {...pageProps} />
      </Refine>
    </MantineProvider>
  );
}

export default MyApp;
