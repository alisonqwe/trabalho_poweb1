//salva e carrega o catálogo no navegador usando LocalStorage

export function carregarCatalogo() {
  return JSON.parse(localStorage.getItem("catalogo")) || [];
}

export function salvarCatalogo(catalogo) {
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
}

// buscar os dados no navegador