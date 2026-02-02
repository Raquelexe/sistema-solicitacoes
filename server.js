const express = require('express');
const app = express();

// IMPORTANTE: estes dois precisam vir ANTES das rotas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/solicitacoes', (req, res) => {
  console.log('BODY RECEBIDO:', req.body);

  const { numero_protocolo, nome_responsavel } = req.body;

  if (!numero_protocolo || !nome_responsavel) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
  }

  res.status(201).json({
    ok: true,
    numero_protocolo,
    nome_responsavel
  });
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});
