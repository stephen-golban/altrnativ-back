import app from "./app";
import { _db } from "./configs/_db";

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await _db();

  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
