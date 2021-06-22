import React from "react";
import { GetServerSideProps } from "next";
import { fetchTweets } from "../app/lib/api/serverside";
import { useFirebase } from "../app/context/FirebaseProvider";

const Home: React.FC = () => {
    const { tweets } = useFirebase();

    return (
        <div>
            {tweets.map((tweet, index) => (
                <div key={index}>{tweet.message}</div>
            ))}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const tweets = await fetchTweets();

    return {
        props: {
            tweets,
        },
    };
};

export default Home;
