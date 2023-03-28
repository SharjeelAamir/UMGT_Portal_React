import { trim } from "lodash";

function trimData(data) {
    Object.keys(data).forEach((item) => {
        if (!Array.isArray(data[item])) {
            if (typeof data[item] === "number" && data[item] !== null && data[item] !== "") {
                data[item] = parseInt(trim(data[item]));
            } else data[item] = trim(data[item]);
        }
    });
    return data;
}

export { trimData };
