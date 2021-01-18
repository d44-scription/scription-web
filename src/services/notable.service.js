import http from "../http-common";

class NotableDataService {
  index(notebookId, notableType) {
    return http.get(`/notebooks/${notebookId}/${notableType}.json`);
  }
}

export default new NotableDataService();
