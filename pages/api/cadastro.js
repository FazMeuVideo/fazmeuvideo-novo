import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
      });

      await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, ip TEXT)');

      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const existingUser = await db.get('SELECT * FROM users WHERE email = ? OR ip = ?', [email, ip]);
      if (existingUser) {
        return res.status(400).json({ message: 'Email ou IP já cadastrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.run('INSERT INTO users (email, password, ip) VALUES (?, ?, ?)', [email, hashedPassword, ip]);

      await db.close();
      res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      res.status(500).json({ message: 'Erro ao cadastrar' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}