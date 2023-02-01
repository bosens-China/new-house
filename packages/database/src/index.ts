import mongoose from 'mongoose';

const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_INITDB_ROOT_PORT = process.env.MONGO_INITDB_ROOT_PORT;

await mongoose.connect(
  `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:${MONGO_INITDB_ROOT_PORT}/house`,
);
console.log(`mongodb 连接成功`);
