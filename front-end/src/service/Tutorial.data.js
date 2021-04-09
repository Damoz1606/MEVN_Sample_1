import http from "../http/http-common";

class TutorialService {
  getAll() {
    return http.get("/tutorial");
  }

  getById(id) {
    return http.get(`/tutorial/${id}`);
  }

  post(data) {
    return http.post("/tutorial", data);
  }

  update(id, data) {
    return http.put(`/tutorial/${id}`, data);
  }

  deleteById(id) {
    return http.delete(`/tutorial/${id}`);
  }

  deleteAll() {
    return http.delete("/tutorial");
  }
}

export default new TutorialService();
