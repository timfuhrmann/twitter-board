import styled from "styled-components";

export const Content = styled.div`
    margin: 0 2rem;
    width: calc(100% - 4rem);

    @media ${p => p.theme.bp.m} {
        max-width: 70rem;
        width: calc(100% - 20rem);
        margin: 0 auto;
    }
`;
