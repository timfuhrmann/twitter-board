import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { fetchTweets } from "../app/lib/api/serverside";
import { Input } from "../app/components/Input";
import { TweetList } from "../app/components/TweetList";
import { Headline } from "../app/css/typo";
import { Content } from "../app/css/content";

const HomeWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const HomeInner = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const HomeSpacer = styled.div`
    width: 100%;
    height: 1rem;
    background-color: ${p => p.theme.blackGrey};
    border: 0.1rem solid ${p => p.theme.grey};
    border-left: none;
    border-right: none;
`;

const HomeHeader = styled.div`
    display: flex;
    align-items: center;
    height: 7.5rem;
    padding: 0 2rem;
    border-bottom: 0.1rem solid ${p => p.theme.grey};
`;

const HomeContent = styled(Content)`
    border: 0.1rem solid ${p => p.theme.grey};
    border-bottom: none;
    border-top: none;
`;

const HomeStage = styled(HomeContent)`
    height: 100%;
    flex: 1;
    overflow-y: scroll;
`;

const Home: React.FC = () => {
    return (
        <HomeWrapper>
            <HomeInner>
                <HomeContent>
                    <HomeHeader>
                        <Headline>Tweets</Headline>
                    </HomeHeader>
                    <Input />
                    <HomeSpacer />
                </HomeContent>
                <HomeStage>
                    <TweetList />
                </HomeStage>
            </HomeInner>
        </HomeWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const tweets = await fetchTweets();

    return {
        props: {
            tweets,
        },
    };
};

export default Home;
