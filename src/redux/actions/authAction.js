import { login } from "../../services/Auth";
import { LOGIN_SUCCESS, LOGIN_ERROR } from "../slices/authenticationSlice";
export const loginAction = (authData) => async (dispatch) => {
    const res = await login(authData);
    if (res?.data?.login === true) {
        // localStorage.setItem("token", res?.data?.token);
        // localStorage.setItem("login", true);
        dispatch(LOGIN_SUCCESS(res?.data));
        return res;
    } else {
        dispatch(LOGIN_ERROR("Error"));
        return res;
    }
};
