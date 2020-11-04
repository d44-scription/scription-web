import axios from "axios";

export default axios.create({
  // TODO: Replace this with an environment variable once hosted
  baseURL: "https://scription-api-staging.herokuapp.com/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});
