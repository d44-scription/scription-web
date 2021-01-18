import http from "../http-common";

class NotableDataService {
  index(notebookId, notableType) {
    return http.get(`/notebooks/${notebookId}/${notableType}.json`);
  }

  create(notebookId, name, type) {
    let params = {};
    params["notable"] = {};
    params["notable"]["name"] = name;
    params["notable"]["type"] = type;

    return http.post(`/notebooks/${notebookId}/notables.json`, params);
  }
}

export default new NotableDataService();
