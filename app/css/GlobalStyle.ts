import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { font } from "./font";
import { FlowText } from "./typo";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    ${font}
    
    body {
        font-family: "Circular Std", Helvetica, Arial, sans-serif;
        background-color: ${p => p.theme.black};
        color: ${p => p.theme.white};
        ${FlowText};
    }
    
    .icon {
        width: 100%;
        height: 100%;
    }
`;
