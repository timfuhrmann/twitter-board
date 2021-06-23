import React from "react";
import { App } from "../types/App";
import styled from "styled-components";
import { parseDate } from "../lib/date";

const TweetWrapper = styled.div`
    padding: 2rem;
    border-bottom: 0.1rem solid ${p => p.theme.grey};

    &:last-child {
        border: none;
    }
`;

const TweetImage = styled.img`
    max-width: 100%;
    border-radius: 2rem;
    margin: 1rem 0 0;
    overflow: hidden;
    background-color: ${p => p.theme.blackGrey};
`;

const TweetText = styled.div``;

const TweetHead = styled.div`
    margin-bottom: 0.5rem;
`;

const TweetName = styled.span`
    font-weight: 600;
`;

const TweetInfo = styled.span`
    color: ${p => p.theme.lightGrey};
`;

export const Tweet: React.FC<App.Tweet> = ({ message, image, date }) => {
    return (
        <TweetWrapper>
            <TweetHead>
                <TweetName>Rosé</TweetName>
                <TweetInfo> · {parseDate(date)}</TweetInfo>
            </TweetHead>
            {message && <TweetText>{message}</TweetText>}
            {image && (
                <TweetImage
                    alt="Tweet Image"
                    src={image.url}
                    width={image.width}
                    height={image.height}
                />
            )}
        </TweetWrapper>
    );
};
