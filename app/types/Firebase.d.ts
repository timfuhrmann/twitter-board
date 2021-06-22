export namespace Firebase {
    interface FirebaseDocument<T> {
        name: string;
        fields: T;
        createTime: string;
        updateTime: string;
    }

    interface FirebaseResponse<T = unknown> {
        documents: FirebaseDocument<T>[];
    }
}
