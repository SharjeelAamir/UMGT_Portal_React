import { baseURL } from "../Config";
import axios from "axios";
import { toast } from "react-toastify";
import { trimData } from "../utilities/TrimPayloadData";
import { loadingAction } from "../redux/actions/loadingAction";

export const handlePostRequest =
    (data, url, isShowLoad = false, isShowToast = true, port = 8080) =>
    async (dispatch) => {
        data = await trimData(data);
        try {
            if (isShowLoad) dispatch(loadingAction(true));
            const response = await axios({
                method: "post",
                url: `${baseURL + "/" + url}`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjM2ZmU3NDE0OGY2MmJmNzczYmJmNCIsImVtYWlsIjoiaEBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6ImhlbGxvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTA2ODM5MTMsImV4cCI6MTY1MTk5NzkxMywiYXVkIjoidXNlciIsImlzcyI6IkBEbWluIn0.j6EUXXLDtnSmD3-_5f0AxMF_KtKRWqGgpDghZoKSg6PyIM3lwokSMaUkXm0OoqbtkVNYOMhzxUbO8kA1ibKP7g", //localStorage.getItem("token"),
                },
            });
            if (isShowToast) toast.success(response?.data?.messages);
            if (isShowLoad) dispatch(loadingAction(false));
            return response?.data;
        } catch (error) {
            if (isShowLoad) dispatch(loadingAction(false));
            if (error?.response?.status === 400) toast.warn(error?.response?.data?.[0]?.toastError || "Something went wrong !!");
            else toast.warn(error?.response?.data?.messages || "Something went wrong !!");
            return error?.response;
        }
    };
