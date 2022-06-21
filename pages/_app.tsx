import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../src/core/store/store';
import { HeaderWrapper } from '../src/stories/containers/dashboard-wrapper/header-wrapper';

function MyApp({
  Component, pageProps,
}: AppProps) {
  return (
    <Provider store={store}>
      <HeaderWrapper>
        <Component {...pageProps} />
      </HeaderWrapper>
    </Provider>
  );
}

export default MyApp;
