fetch('/admin/lista')
  .then(r => r.json())
  .then(dados => {
    const tbody = document.getElementById('lista');

    dados.forEach(s => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${s.id}</td>
        <td>${s.numero_protocolo}</td>
        <td>${s.nome_responsavel}</td>
        <td>
          <a href="detalhe.html?id=${s.id}">Ver</a>
        </td>
      `;

      tbody.appendChild(tr);
    });
  });
