import React, { createContext, useContext, useEffect, useState } from "react";
import { App } from "../types/App";
import firebase from "../lib/firebase";

export const COLLECTION_TWEETS = "tweets";

interface FirebaseData {
    tweets: App.Tweet[];
}

const FirebaseContext = createContext<FirebaseData>({} as FirebaseData);

interface FirebaseProviderProps {
    initialTweets: App.Tweet[];
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ initialTweets, children }) => {
    const [tweets, setTweets] = useState<App.Tweet[]>(initialTweets || []);

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

    return <FirebaseContext.Provider value={{ tweets }}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => useContext(FirebaseContext);
