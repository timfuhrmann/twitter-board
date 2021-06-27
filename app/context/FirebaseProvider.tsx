import React, { createContext, useContext, useEffect, useState } from "react";
import { App } from "../types/app";
import firebase from "../lib/firebase";
import { celebrities } from "../lib/celebrities";

export const COLLECTION_TWEETS = "tweets";
export const COLLECTION_LIKES = "likes";
export const STORAGE_LIKES = "twitter-board-likes";

interface FirebaseData {
    tweets: App.Tweet[];
    activeTweet: App.Tweet | null;
    comments: App.Tweet[];
    addTweet: (tweet: App.Tweet, id?: string) => void;
    setActiveTweetId: (id: string) => void;
    likeTweet: (id: string) => void;
    hasLiked: (id: string) => boolean;
    getLikes: (id: string) => number;
}

const FirebaseContext = createContext<FirebaseData>({} as FirebaseData);

interface FirebaseProviderProps {
    initialTweets: App.Tweet[];
    initialLikes: string[];
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
    initialTweets,
    initialLikes,
    children,
}) => {
    const [activeTweetId, setActiveTweetId] = useState<string>("");
    const [activeTweet, setActiveTweet] = useState<App.Tweet | null>(null);
    const [tweets, setTweets] = useState<App.Tweet[]>(initialTweets);
    const [comments, setComments] = useState<App.Tweet[]>([]);
    const [likes, setLikes] = useState<string[]>(initialLikes);
    const [liked, setLiked] = useState<App.Like>({});

    useEffect(() => {
        createTweetsListener();
        createLikesListener();

        const json = localStorage.getItem(STORAGE_LIKES);

        if (json) {
            setLiked(JSON.parse(json));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_LIKES, JSON.stringify(liked));
    }, [liked]);

    useEffect(() => {
        return () => {
            setActiveTweet(null);
            setComments([]);
        };
    }, [activeTweetId]);

    useEffect(() => {
        if (!activeTweetId || !tweets) {
            return;
        }

        setComments(tweets.filter(tweet => tweet.comment === activeTweetId));

        const value = tweets.find(tweet => tweet.id === activeTweetId);

        if (!value) {
            return;
        }

        setActiveTweet(value);
    }, [activeTweetId, tweets]);

    const createTweetsListener = () => {
        firebase
            .firestore()
            .collection(COLLECTION_TWEETS)
            .orderBy("date", "desc")
            .onSnapshot(snapshot => {
                setTweets(
                    snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            id: doc.id,
                        };
                    }) as App.Tweet[]
                );
            });
    };

    const createLikesListener = () => {
        firebase
            .firestore()
            .collectionGroup(COLLECTION_LIKES)
            .onSnapshot(snapshot => {
                setLikes(snapshot.docs.filter(doc => !!doc.data().id).map(doc => doc.data().id));
            });
    };

    const addTweet = (tweet: App.Tweet, id?: string) => {
        const name = celebrities[Math.floor(Math.random() * celebrities.length - 1) + 1];

        firebase
            .firestore()
            .collection(COLLECTION_TWEETS)
            .add({ ...tweet, name, comment: id ? id : null })
            .catch(console.error);
    };

    const likeTweet = (id: string) => {
        if (Object.keys(liked).includes(id)) {
            setLiked(prevState => {
                const newState = { ...prevState };
                delete newState[id];
                return newState;
            });

            if (liked[id]) {
                firebase
                    .firestore()
                    .collection(COLLECTION_TWEETS)
                    .doc(id)
                    .collection(COLLECTION_LIKES)
                    .doc(liked[id])
                    .delete()
                    .catch(console.error);
            }

            return;
        }

        firebase
            .firestore()
            .collection(COLLECTION_TWEETS)
            .doc(id)
            .collection(COLLECTION_LIKES)
            .add({ id })
            .then(ref => {
                setLiked(prevState => {
                    return {
                        ...prevState,
                        [id]: ref.id,
                    };
                });
            })
            .catch(console.error);

        setLiked(prevState => {
            return {
                ...prevState,
                [id]: "",
            };
        });
    };

    const hasLiked = (id: string): boolean => {
        return Object.keys(liked).includes(id);
    };

    const getLikes = (id: string): number => {
        return likes.filter(like => like === id).length;
    };

    return (
        <FirebaseContext.Provider
            value={{
                tweets,
                activeTweet,
                comments,
                addTweet,
                setActiveTweetId,
                likeTweet,
                hasLiked,
                getLikes,
            }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => useContext(FirebaseContext);
