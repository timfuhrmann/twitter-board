import React from "react";
import { Tweet } from "./Tweet";
import { useFirebase } from "../context/FirebaseProvider";
import styled from "styled-components";

const ListWrapper = styled.div``;

export const TweetList: React.FC = () => {
    const { tweets } = useFirebase();

    return (
        <ListWrapper>
            {tweets
                .sort((a, b) => b.date - a.date)
                .map(tweet => (
                    <Tweet key={tweet.id} {...tweet} />
                ))}
        </ListWrapper>
    );
};
