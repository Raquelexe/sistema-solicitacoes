const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch(`/admin/solicitacoes/${id}`)
  .then(r => r.json())
  .then(d => {
    document.getElementById('dados').textContent =
      JSON.stringify(d, null, 2);
  });
