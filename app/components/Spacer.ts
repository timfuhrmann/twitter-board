import styled from "styled-components";

export const Spacer = styled.div`
    width: 100%;
    height: 1rem;
    background-color: ${p => p.theme.blackGrey};
    border: 0.1rem solid ${p => p.theme.grey};
    border-left: none;
    border-right: none;
`;
