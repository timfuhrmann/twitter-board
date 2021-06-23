import styled from "styled-components";

export const Button = styled.button`
    position: relative;
    font-weight: 600;
    background-color: ${p => p.theme.primary};
    padding: 1rem 1.5rem;
    border-radius: 20rem;
    line-height: 1;
    transition: background-color 0.2s;
    will-change: background-color;
    overflow: hidden;
    transform: translateZ(0);

    @media (hover: hover) {
        &:not(:disabled):hover {
            background-color: ${p => p.theme.primaryDark};
        }
    }

    &:disabled {
        opacity: 0.5;
    }
`;
