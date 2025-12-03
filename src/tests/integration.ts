import assert from 'node:assert';
import db from '../db';

db.exec('DELETE FROM posts; DELETE FROM users;');

const u = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run('Alice', 'alice@example.com');
assert.ok(u.lastInsertRowid, 'user created');

const p = db.prepare('INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)').run(
  'Hello', 'World', Number(u.lastInsertRowid)
);
assert.ok(p.lastInsertRowid, 'post created');

const rows = db.prepare(`
  SELECT p.title, u.name AS authorName
  FROM posts p JOIN users u ON u.id = p.authorId
`).all();
assert.ok(rows.length === 1 && rows[0].authorName === 'Alice', 'list joins author');

console.log('API integration test passed');