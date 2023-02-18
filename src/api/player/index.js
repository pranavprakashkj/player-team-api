import verifyRoute from "../../middleware/auth";

export default (app) => {
  app.put(`/player/:id`, require("./update").default);
  app.delete(`/player/:id`, verifyRoute, require("./delete").default);
  app.get(`/player`, require("./getList").default);
  app.post(`/player`, require("./create").default);
};
