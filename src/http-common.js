import axios from "axios";

export default axios.create({
  // TODO: Replace this with an environment variable once hosted
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});
