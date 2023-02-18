export default (app) => {
  app.post(`/team/process`, require("./process").default);
};
