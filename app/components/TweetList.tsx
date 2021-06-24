import React from "react";
import styled from "styled-components";
import { Tweet } from "./Tweet";
import { App } from "../types/app";

const ListWrapper = styled.div``;

interface TweetListProps {
    tweets: App.Tweet[];
    isComment?: boolean;
}

export const TweetList: React.FC<TweetListProps> = ({ tweets, isComment }) => {
    return (
        <ListWrapper>
            {tweets.map(tweet => (
                <Tweet key={tweet.id} {...tweet} isComment={isComment} />
            ))}
        </ListWrapper>
    );
};
