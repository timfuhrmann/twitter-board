import FireStoreParser from "firestore-parser";
import { Firebase } from "../../types/Firebase";
import { App } from "../../types/App";

const db = <T>(endpoint: string): Promise<T> => {
    return fetch(process.env.FIRESTORE_REST_ENDPOINT + endpoint)
        .then(res => res.json())
        .then(res => FireStoreParser(res))
        .catch(console.error);
};

export const fetchTweets = async () => {
    const { documents } = await db<Firebase.FirebaseResponse<App.Tweet>>("/tweets");
    return documents.map(doc => doc.fields);
};