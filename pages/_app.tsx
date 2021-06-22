import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/css/theme";
import { GlobalStyle } from "../app/css/GlobalStyle";
import { FirebaseProvider } from "../app/context/FirebaseProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <FirebaseProvider initialTweets={pageProps.tweets}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </FirebaseProvider>
    );
};

export default App;
