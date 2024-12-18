import axios from "axios";

const authServiceAPI = axios.create({
  baseURL: "http://localhost:3001/api/auth",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

export default authServiceAPI;
