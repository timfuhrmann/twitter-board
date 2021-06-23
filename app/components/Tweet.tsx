import React from "react";
import { App } from "../types/app";
import styled from "styled-components";
import { parseDate } from "../lib/date";
import { Icon, Heart } from "../lib/icon";
import { ButtonIconRed } from "./ButtonIcon";
import { useFirebase } from "../context/FirebaseProvider";

const TweetWrapper = styled.div`
    padding: 2rem;
    border-bottom: 0.1rem solid ${p => p.theme.grey};
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

const TweetControls = styled.div`
    display: flex;
    color: ${p => p.theme.lightGrey};
    margin-top: 1rem;
`;

export const Tweet: React.FC<App.Tweet> = ({ message, image, date, id }) => {
    const { likeTweet, hasLiked, getLikes } = useFirebase();
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
            <TweetControls>
                <ButtonIconRed
                    onClick={() => likeTweet(id)}
                    active={hasLiked(id)}
                    data-info={getLikes(id) > 0 ? getLikes(id) : undefined}>
                    <Icon name="heart" icon={Heart} />
                </ButtonIconRed>
            </TweetControls>
        </TweetWrapper>
    );
};
