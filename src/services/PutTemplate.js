import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";
import { trimData } from "../utilities/TrimPayloadData";
import { loadingAction } from "../redux/actions/loadingAction";

export const handlePutRequest =
    (data, url, isShowLoad = false, isShowToast = true, port = 8080) =>
    async (dispatch) => {
        data = await trimData(data);
        try {
            if (isShowLoad) dispatch(loadingAction(true));
            const response = await axios({
                method: "put",
                url: `${baseURL + port + "/" + url}`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (isShowToast) toast.success(response?.data?.messages);
            if (isShowLoad) dispatch(loadingAction(false));
            return response?.data;
        } catch (error) {
            if (isShowLoad) dispatch(loadingAction(false));
            else if (error?.response?.status === 400) toast.warn(error?.response?.data?.[0]?.toastError || "Something went wrong !!");
            else toast.warn(error?.response?.data?.messages || "Something went wrong !!");

            return error?.response;
        }
    };
