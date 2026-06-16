export const statusColorAndValue = (status) => {
    switch (status) {
        case "created":
            return ["text-blue-500", "CREATED"]
            break;
        case "in progress":
            return ["text-orange-500", "IN PROGRESS"]
            break;
        case "finished":
            return ["text-green-500", "FINISHED"]
            break;

        default:
            break;
    }
}