import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { fetchLikes, fetchTweets } from "../app/lib/api/serverside";
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
    height: 6rem;
    padding: 0 2rem;
    border-bottom: 0.1rem solid ${p => p.theme.grey};

    @media ${p => p.theme.bp.l} {
        height: 7.5rem;
    }
`;

const HomeContent = styled(Content)`
    @media ${p => p.theme.bp.m} {
        border: 0.1rem solid ${p => p.theme.grey};
        border-bottom: none;
        border-top: none;
    }
`;

const HomeStage = styled.div`
    height: 100%;
    flex: 1;
    overflow-y: scroll;
`;

const Home: React.FC = () => {
    return (
        <HomeWrapper>
            <HomeInner>
                <HomeContent breakMobile>
                    <HomeHeader>
                        <Headline>Tweets</Headline>
                    </HomeHeader>
                </HomeContent>
                <HomeStage>
                    <HomeContent breakMobile>
                        <Input />
                        <HomeSpacer />
                        <TweetList />
                    </HomeContent>
                </HomeStage>
            </HomeInner>
        </HomeWrapper>
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
