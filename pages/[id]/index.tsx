import React, { useEffect } from "react";
import { useFirebase } from "../../app/context/FirebaseProvider";
import { useRouter } from "next/router";
import { Tweet } from "../../app/components/Tweet";
import { Template } from "../../app/components/Template";
import { Input } from "../../app/components/Input";
import { Spacer } from "../../app/components/Spacer";
import { TweetList } from "../../app/components/TweetList";

const Details: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { activeTweet, setActiveTweetId, comments, addTweet } = useFirebase();

    useEffect(() => {
        if (!id || "string" !== typeof id) {
            return;
        }

        setActiveTweetId(id);
        return () => setActiveTweetId("");
    }, [id]);

    return (
        <Template title="Tweet" onBack={() => router.back()}>
            {activeTweet ? (
                <>
                    <Tweet {...activeTweet} />
                    <Input
                        placeholder="Leave a comment!"
                        onTweet={value => addTweet(value, activeTweet.id)}
                    />
                    {comments.length > 0 && <Spacer />}
                    <TweetList tweets={comments} isComment />
                </>
            ) : (
                "Loading..."
            )}
        </Template>
    );
};

export default Details;
