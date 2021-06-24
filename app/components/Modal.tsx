import React from "react";
import styled from "styled-components";
import { Content } from "../css/content";

const ModalWrapper = styled.div`
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.25);
    opacity: 0;
    animation: 0.4s fade-in ease forwards;

    @keyframes fade-in {
        100% {
            opacity: 1;
        }
    }
`;

const ModalInner = styled.div`
    width: 100%;
    max-width: 80rem;
    height: 80vh;
    margin: 0 auto;
    border-radius: 1rem;
    background-color: ${p => p.theme.black};
    overflow-y: auto;
`;

export const Modal: React.FC = ({ children }) => {
    return (
        <ModalWrapper>
            <Content breakDesktop>
                <ModalInner>{children}</ModalInner>
            </Content>
        </ModalWrapper>
    );
};
