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
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { Loading } from '../components/imports'

export default function MyApp(props) {
  const { Component, emotionCache =
    clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport"
          content="initial-scale=1, width=device-width" />
      </Head>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
