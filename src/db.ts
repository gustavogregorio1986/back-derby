import Database from 'better-sqlite3';

// Cria ou abre o banco de dados
const db = new Database('data.sqlite');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIcd\QUE
);
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  authorId INTEGER NOT NULL,
  FOREIGN KEY(authorId) REFERENCES users(id)
);
`);

export default db;