import styled, { css } from "styled-components";

export const Headline = styled.h1`
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: -0.075rem;

    @media ${p => p.theme.bp.l} {
        font-size: 3rem;
    }
`;

export const FlowText = css`
    font-size: 1.75rem;
    letter-spacing: -0.05rem;
    line-height: 1.2;
`;
