import React, { useContext } from "react";
import styled from "styled-components";
import { Grid, SearchBar, SearchContext, SearchContextManager } from "@giphy/react-components";
import { App } from "../types/app";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Close, Icon } from "../lib/icon";

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
        <>
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
        </>
    );
};

export const Gifs: React.FC<GifsProps> = ({ onSelect, onClose }) => (
    <SearchContextManager apiKey={process.env.NEXT_PUBLIC_GIPHY_API_KEY || ""}>
        <Giphy onSelect={onSelect} onClose={onClose} />
    </SearchContextManager>
);
