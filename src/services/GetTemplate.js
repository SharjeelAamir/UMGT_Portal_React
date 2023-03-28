import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

export const handleGetRequest = async (url) => {
    try {
        const response = await axios.get(`${baseURL + url}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response.data;
    } catch (error) {
        const id = toast.loading("Please wait...");
        if (error?.response?.status === 500) toast.update(id, { render: error?.response?.data?.messages || "Something went wrong !!", type: "error", isLoading: false, autoClose: 3000 });
        else toast.update(id, { render: error?.response?.data?.messages || "Something went wrong !!", type: "warn", isLoading: false, autoClose: 3000 });
    }
};
