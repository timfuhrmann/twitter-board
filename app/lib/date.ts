export const parseDate = (time: number) => {
    const diff = Date.now() - time;

    const date = new Date(diff);
    const created = new Date(time);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const day = created.getDate();
    const month = created.getMonth() + 1;

    if (hours > 24) {
        return `${day}. ${months[month]}`;
    } else if (hours > 0) {
        return `${hours} h`;
    } else if (minutes > 0) {
        return `${minutes} min`;
    } else {
        return "just now";
    }
};

const months: Record<number, string> = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
};
