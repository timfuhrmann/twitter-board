import React, { createContext, useContext, useEffect, useState } from "react";
import { App } from "../types/app";
import firebase from "../lib/firebase";

export const COLLECTION_TWEETS = "tweets";
export const COLLECTION_LIKES = "likes";
export const STORAGE_LIKES = "twitter-board-likes";

interface FirebaseData {
    tweets: App.Tweet[];
    addTweet: (tweet: App.Tweet) => void;
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
    const [tweets, setTweets] = useState<App.Tweet[]>(initialTweets);
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

    const createTweetsListener = () => {
        firebase
            .firestore()
            .collection(COLLECTION_TWEETS)
            .onSnapshot(snapshot => {
                setTweets(snapshot.docs.map(doc => doc.data()) as App.Tweet[]);
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

    const addTweet = (tweet: App.Tweet) => {
        firebase
            .firestore()
            .collection(COLLECTION_TWEETS)
            .add(tweet)
            .then(ref => {
                ref.set({ id: ref.id }, { merge: true }).catch(console.error);
            })
            .catch(console.error);
    };

    const likeTweet = (id: string) => {
        if (Object.keys(liked).includes(id) && liked[id]) {
            firebase
                .firestore()
                .collection(COLLECTION_TWEETS)
                .doc(id)
                .collection(COLLECTION_LIKES)
                .doc(liked[id])
                .delete()
                .catch(console.error);

            setLiked(prevState => {
                const newState = { ...prevState };
                delete newState[id];
                return newState;
            });

            return;
        } else if (Object.keys(liked).includes(id)) {
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
        <FirebaseContext.Provider value={{ tweets, addTweet, likeTweet, hasLiked, getLikes }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => useContext(FirebaseContext);
