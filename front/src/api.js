import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
    withCredentials: true, // JWT cookie
});

api.interceptors.request.use((cfg) => {
    const t = localStorage.getItem("token");
    if (t) cfg.headers.Authorization = `Bearer ${t}`;
    else delete cfg.headers.Authorization; // не слать Bearer undefined
    return cfg;
});
/* ───────────────────────────────────────────────────────────────*/