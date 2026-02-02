const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS solicitacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero_protocolo TEXT,
      nome_responsavel TEXT,
      telefone TEXT,
      nome_evento TEXT,
      tipo_evento TEXT,
      participantes INTEGER,
      publico_esperado INTEGER,
      descricao_evento TEXT,
      data_evento TEXT,
      hora_inicio TEXT,
      hora_termino TEXT,
      endereco_evento TEXT,
      ruas_interditadas TEXT,
      data_interdicao TEXT,
      hora_interdicao_inicio TEXT,
      hora_interdicao_termino TEXT,
      interdicao_parcial INTEGER,
      qtd_agentes INTEGER,
      observacoes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS anexos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      solicitacao_id INTEGER,
      tipo TEXT,
      nome_original TEXT,
      caminho TEXT
    )
  `);
});

module.exports = db;
