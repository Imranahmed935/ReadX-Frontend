import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://assignment-3-murex-eta.vercel.app/api/v1", 
});
