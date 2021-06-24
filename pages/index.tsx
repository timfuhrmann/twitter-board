import React from "react";
import { GetServerSideProps } from "next";
import { fetchLikes, fetchTweets } from "../app/lib/api/serverside";
import { Input } from "../app/components/Input";
import { TweetList } from "../app/components/TweetList";
import { Template } from "../app/components/Template";
import { useFirebase } from "../app/context/FirebaseProvider";
import { Spacer } from "../app/components/Spacer";

const Home: React.FC = () => {
    const { tweets, addTweet } = useFirebase();

    return (
        <Template title="Board">
            <Input placeholder="Leave a message!" onTweet={addTweet} />
            <Spacer />
            <TweetList tweets={tweets} />
        </Template>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const tweets = await fetchTweets();
    const likes = await fetchLikes();

    return {
        props: {
            likes,
            tweets,
        },
    };
};

export default Home;
