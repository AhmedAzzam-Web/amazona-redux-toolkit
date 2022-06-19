import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();
import "../styles/globals.css";
import { store } from '../utils/Store';
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import PageProivder from '../src/PageProvider'
import { ThemeProvider } from 'next-themes';
import { GlobalStyles } from '@mui/material';
import { globalStyles } from '../src/Theme';

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
            <PageProivder>
              <GlobalStyles styles={globalStyles} />
              <Component {...pageProps} />
            </PageProivder>
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
