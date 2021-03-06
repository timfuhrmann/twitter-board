import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { FlowText } from "./typo";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    
    body {
        font-family: "Circular Std", Helvetica, Arial, sans-serif;
        background-color: ${p => p.theme.black};
        color: ${p => p.theme.white};
        ${FlowText};
        word-break: break-word;
        hyphens: auto;
    }
    
    .icon {
        width: 100%;
        height: 100%;
    }
`;
