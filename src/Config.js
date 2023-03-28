let baseURL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_BASE_URL_DEV_AR : process.env.REACT_APP_BASE_URL_LIVE;

export { baseURL };
