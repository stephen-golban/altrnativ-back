import app from "./app";
import configs from "./configs";
import { _db } from "./configs/_db";

app.listen(configs.port, async () => {
  await _db();

  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${configs.port}`);
  /* eslint-enable no-console */
});
