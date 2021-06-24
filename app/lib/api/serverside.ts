import firebase from "../firebase";
import { App } from "../../types/app";
import { COLLECTION_LIKES, COLLECTION_TWEETS } from "../../context/FirebaseProvider";

export const fetchTweets = async (): Promise<App.Tweet[]> => {
    const res = await firebase
        .firestore()
        .collection(COLLECTION_TWEETS)
        .orderBy("date", "desc")
        .get();
    return res.docs.map(doc => {
        return {
            ...doc.data(),
            id: doc.id,
        };
    }) as App.Tweet[];
};

export const fetchLikes = async (): Promise<string[]> => {
    const res = await firebase.firestore().collectionGroup(COLLECTION_LIKES).get();
    return res.docs.map(doc => doc.data().id);
};
