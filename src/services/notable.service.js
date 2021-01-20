import http from "../http-common";

class NotableDataService {
  index(notebookId, notableType, query) {
    let url = `/notebooks/${notebookId}/${notableType}.json`;

    if (query !== undefined) {
      url = `${url}?q=${query}`;
    }

    return http.get(url);
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
