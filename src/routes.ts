import { Router } from 'express';
import db from './db';

const router = Router();

// GET /users
router.get('/users', (_req, res) => {
  const users = db.prepare('SELECT id, name, email FROM users').all();
  res.json(users);
});

// POST /users
router.post('/users', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  try {
    const info = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)').run(name, email);
    res.status(201).json({ id: info.lastInsertRowid, name, email });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// GET /posts (suporta ?authorId=)
router.get('/posts', (req, res) => {
  const { authorId } = req.query as { authorId?: string };
  const base = `
    SELECT p.id, p.title, p.content, p.authorId, u.name AS authorName
    FROM posts p JOIN users u ON u.id = p.authorId
  `;
  const rows = authorId
    ? db.prepare(base + ' WHERE p.authorId = ? ORDER BY p.id DESC').all(Number(authorId))
    : db.prepare(base + ' ORDER BY p.id DESC').all();
  res.json(rows);
});

// POST /posts (valida autor)
router.post('/posts', (req, res) => {
  const { title, content, authorId } = req.body || {};
  if (!title || !content || !authorId) return res.status(400).json({ error: 'title, content, authorId required' });

  const author = db.prepare('SELECT id FROM users WHERE id = ?').get(authorId);
  if (!author) return res.status(400).json({ error: 'author does not exist' });

  const info = db.prepare('INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)').run(title, content, authorId);
  res.status(201).json({ id: info.lastInsertRowid, title, content, authorId });
});

export default router;