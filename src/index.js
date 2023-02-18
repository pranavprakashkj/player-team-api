import app from "./api";
import database from "./db";

const port = 3000;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

export default app;
