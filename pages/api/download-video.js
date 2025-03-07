import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ message: 'Nome do arquivo não fornecido' });
  }

  const filePath = path.join(process.cwd(), 'public', filename);
  console.log('Tentando servir arquivo:', filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Arquivo não encontrado' });
  }

  const fileStream = fs.createReadStream(filePath);
  res.setHeader('Content-Type', filename.endsWith('.mp4') ? 'video/mp4' : 'audio/mpeg');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  fileStream.pipe(res);
}