export namespace App {
    interface Tweet {
        id: string;
        message: string | null;
        image: Image | null;
        date: number;
    }

    interface Image {
        url: string;
        height: number;
        width: number;
    }
}
