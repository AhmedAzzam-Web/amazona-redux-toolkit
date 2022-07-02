import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();
import "../styles/globals.css";
import { store } from '../utils/Store';
import { persistor } from '../utils/Store';
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import PageProivder from '../src/PageProvider'
import { ThemeProvider } from 'next-themes';
import { GlobalStyles } from '@mui/material';
import { globalStyles } from '../src/Theme';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { Loading } from '../components/imports'

export default function MyApp(props) {
  const { Component, emotionCache =
    clientSideEmotionCache, pageProps } = props;

  return (
    <ThemeProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport"
            content="initial-scale=1, width=device-width" />
        </Head>
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <PageProivder>
                <GlobalStyles styles={globalStyles} />
                <Component {...pageProps} />
              </PageProivder>
            </PersistGate>
          </Provider>
        </SnackbarProvider>
      </CacheProvider>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
