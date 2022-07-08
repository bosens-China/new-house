import { Low, JSONFile } from 'lowdb';
import path from 'path';

export interface Data {
  userName: string;
  password: string;
  mailbox?: Array<string>;
}

const file = path.join(__dirname, './userData.json');

const adapter = new JSONFile<Array<Data>>(file);

const db = new Low(adapter);

export default db;
