import styled from "styled-components";

export const ButtonIcon = styled.button<{ active?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    width: 2rem;
    height: 2rem;
    color: ${p => (p.active ? p.theme.primary : p.theme.lightGrey)};
    transition: color 0.2s;
    will-change: color;
    font-size: 1.5rem;

    &::before {
        content: attr(data-info);
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(calc(100% + 1rem), -50%);
        z-index: 1;
    }

    &::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background-color: ${p => p.theme.primary};
        opacity: 0;
        transition: opacity 0.2s;
        will-change: opacity;
    }

    @media (hover: hover) {
        &:not(:disabled):hover {
            color: ${p => p.theme.primaryDark};

            &::after {
                opacity: 0.1;
            }
        }
    }

    &:not(:disabled):active {
        color: ${p => p.theme.primary};

        &::after {
            opacity: 0.2;
        }
    }

    &:disabled {
        opacity: 0.5;
    }
`;

export const ButtonIconRed = styled(ButtonIcon)`
    color: ${p => (p.active ? p.theme.red : p.theme.lightGrey)};

    &::after {
        background-color: ${p => p.theme.red};
    }

    @media (hover: hover) {
        &:not(:disabled):hover {
            color: ${p => p.theme.redDark};
        }
    }

    &:not(:disabled):active {
        color: ${p => p.theme.red};
    }
`;
