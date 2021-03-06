import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { App } from "../types/app";
import { parseDate } from "../lib/date";
import { Icon, Heart, Message } from "../lib/icon";
import { ButtonIconRed, ButtonIcon } from "./ButtonIcon";
import { useFirebase } from "../context/FirebaseProvider";

const TweetWrapper = styled.div`
    position: relative;
    padding: 2rem;
    border-bottom: 0.1rem solid ${p => p.theme.grey};
    cursor: pointer;

    &:last-child {
        border: none;
    }
`;

const TweetLink = styled.a`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const TweetImage = styled.img`
    max-width: 100%;
    border-radius: 2rem;
    margin: 1rem 0 0;
    overflow: hidden;
    background-color: ${p => p.theme.blackGrey};
    height: auto;
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
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    color: ${p => p.theme.lightGrey};
    margin: 1rem -2rem 0;

    ${ButtonIconRed} {
        margin: 0 2rem;
    }

    ${ButtonIcon} {
        margin: 0 2rem;
    }
`;

const CommentWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-top: 2rem;
    border-radius: 1rem;
    border: 0.1rem solid ${p => p.theme.grey};
`;

interface TweetProps extends App.Tweet {
    isComment?: boolean;
    hideControls?: boolean;
}

export const Tweet: React.FC<TweetProps> = ({
    name,
    message,
    image,
    date,
    id,
    comment,
    hideControls,
    isComment,
}) => {
    const { likeTweet, hasLiked, getLikes, tweets } = useFirebase();

    const commentTweet = comment ? tweets.find(tweet => tweet.id === comment) : undefined;

    return (
        <TweetWrapper>
            <TweetHead>
                <TweetName>{name}</TweetName>
                <TweetInfo> ?? {parseDate(date)}</TweetInfo>
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
            {!hideControls && (
                <TweetControls>
                    <Link href={"/" + id} passHref>
                        <ButtonIcon as="a">
                            <Icon name="message" icon={Message} />
                        </ButtonIcon>
                    </Link>
                    <ButtonIconRed
                        onClick={() => likeTweet(id)}
                        active={hasLiked(id)}
                        data-info={getLikes(id) > 0 ? getLikes(id) : undefined}>
                        <Icon name="heart" icon={Heart} />
                    </ButtonIconRed>
                </TweetControls>
            )}
            {commentTweet && !isComment && (
                <CommentWrapper>
                    <Tweet {...commentTweet} isComment hideControls />
                </CommentWrapper>
            )}
            <Link href={"/" + id} passHref>
                <TweetLink />
            </Link>
        </TweetWrapper>
    );
};
