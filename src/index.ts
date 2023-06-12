import { Db, MongoClient } from "mongodb";
import app from "./app";
import configs from "./configs";

const port = process.env.PORT || 5000;

const client: MongoClient = new MongoClient(configs.db.url);

async function connectToServer() {
  await client.connect();
  console.log("Connected to MongoDB server successfully.");
  const db: Db = client.db(configs.db.name);
  app.locals.db = db; // make db available to routes
}

app.listen(port, async () => {
  await connectToServer();

  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
