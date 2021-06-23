import React, { createContext, useContext, useEffect, useState } from "react";
import { App } from "../types/App";
import firebase from "../lib/firebase";

export const COLLECTION_TWEETS = "tweets";

interface FirebaseData {
    tweets: App.Tweet[];
    addTweet: (tweet: App.Tweet) => void;
}

const FirebaseContext = createContext<FirebaseData>({} as FirebaseData);

interface FirebaseProviderProps {
    initialTweets: App.Tweet[];
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ initialTweets, children }) => {
    const [tweets, setTweets] = useState<App.Tweet[]>(initialTweets);

    useEffect(() => {
        createSnapshotListener();
    }, []);

    const createSnapshotListener = () => {
        firebase
            .firestore()
            .collection(COLLECTION_TWEETS)
            .onSnapshot(snapshot => {
                setTweets(snapshot.docs.map(doc => doc.data()) as App.Tweet[]);
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

    return (
        <FirebaseContext.Provider value={{ tweets, addTweet }}>{children}</FirebaseContext.Provider>
    );
};

export const useFirebase = () => useContext(FirebaseContext);
