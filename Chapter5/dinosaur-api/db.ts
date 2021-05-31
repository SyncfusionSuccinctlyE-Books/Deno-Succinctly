// db.ts

import { config } from "./deps.ts";
import DinosaurSchema from "./schema.ts";
import { MongoClient } from "./deps.ts";

const { DB, DB_USER, DB_PASSWORD } = config();

// Ensure that you paste your connection string in here
const connectStr =
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@dinosaur.fmukv.mongodb.net/${DB}?retryWrites=true&w=majority`;

const client = new MongoClient();
client.connectWithUri(connectStr);

const db = client.database(DB);
const dinosaurCollection = db.collection<DinosaurSchema>("dinosaurs");

export { db, dinosaurCollection };
