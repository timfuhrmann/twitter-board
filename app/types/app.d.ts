export namespace App {
    interface Tweet {
        id: string;
        message: string | null;
        image: Image | null;
        date: number;
        comment: string | null;
        name: string;
    }

    interface Image {
        url: string;
        height: number;
        width: number;
    }

    type Like = Record<string, string>;
}
