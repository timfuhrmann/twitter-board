import React, { useContext } from "react";
import styled from "styled-components";
import { Grid, SearchBar, SearchContext, SearchContextManager } from "@giphy/react-components";
import { App } from "../types/app";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Close, Icon } from "../lib/icon";
import { Content } from "../css/content";

const GifsWrapper = styled.div`
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.25);
    opacity: 0;
    animation: 0.4s fade-in ease forwards;

    @keyframes fade-in {
        100% {
            opacity: 1;
        }
    }
`;

const GifsInner = styled.div`
    position: relative;
    width: 100%;
    max-width: 80rem;
    height: 80vh;
    margin: 0 auto;
    border-radius: 0.5rem;
    background-color: ${p => p.theme.black};
    overflow-y: auto;
    opacity: 0;
    animation: 0.4s fade-in ease forwards;

    @keyframes fade-in {
        100% {
            opacity: 1;
        }
    }
`;

const GifsHead = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
`;

const GifsSearch = styled.div`
    flex: 1;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-left: 3.5rem;
`;

const GifsClose = styled.button`
    position: fixed;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.3rem;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
`;

interface GifsProps {
    onClose: () => void;
    onSelect: (images: App.Image) => void;
}

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY || "");

const Giphy: React.FC<GifsProps> = ({ onSelect, onClose }) => {
    const { fetchGifs, searchKey } = useContext(SearchContext);

    const fetchTrendingGifs = (offset: number) => gf.trending({ offset, limit: 10 });

    return (
        <GifsWrapper>
            <Content breakDesktop>
                <GifsInner>
                    <GifsHead>
                        <GifsClose onClick={onClose}>
                            <Icon name="close" icon={Close} />
                        </GifsClose>
                        <GifsSearch>
                            <SearchBar />
                        </GifsSearch>
                    </GifsHead>
                    <Grid
                        columns={3}
                        key={searchKey}
                        fetchGifs={searchKey ? fetchGifs : fetchTrendingGifs}
                        width={800}
                        onGifClick={gif => {
                            onSelect(gif.images.original);
                            onClose();
                        }}
                        noLink
                        hideAttribution
                    />
                </GifsInner>
            </Content>
        </GifsWrapper>
    );
};

export const Gifs: React.FC<GifsProps> = ({ onSelect, onClose }) => (
    <SearchContextManager apiKey={process.env.NEXT_PUBLIC_GIPHY_API_KEY || ""}>
        <Giphy onSelect={onSelect} onClose={onClose} />
    </SearchContextManager>
);
