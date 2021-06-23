export const theme = {
    //region Color
    black: "#000",
    white: "#fff",
    grey: "#2f3336",
    blackGrey: "#15181c",
    lightGrey: "#6e767d",
    primary: "#1da1f2",
    primaryDark: "#1a8fd5",
    //endregion

    //region Breakpoints
    bp: {
        m: "screen and (min-width: 768px)",
        l: "screen and (min-width: 1024px)",
        xl: "screen and (min-width: 1340px)",
        xxl: "screen and (min-width: 2000px)",
    },
    //endregion
};

type Theme = typeof theme;

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
