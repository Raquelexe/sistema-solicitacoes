const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/detalhe', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'detalhe.html'));
});

app.post('/solicitacoes', (req, res) => {
  const { numero_protocolo, nome_responsavel } = req.body;

  if (!numero_protocolo || !nome_responsavel) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const sql = `
    INSERT INTO solicitacoes (numero_protocolo, nome_responsavel)
    VALUES (?, ?)
  `;

  db.run(sql, [numero_protocolo, nome_responsavel], function (err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json({
      ok: true,
      id: this.lastID,
      numero_protocolo,
      nome_responsavel
    });
  });
});

app.get('/solicitacoes', (req, res) => {
  db.all('SELECT * FROM solicitacoes ORDER BY id DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(rows);
  });
});

app.get('/solicitacoes/:id', (req, res) => {
  db.get(
    'SELECT * FROM solicitacoes WHERE id = ?',
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }
      res.json(row);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


