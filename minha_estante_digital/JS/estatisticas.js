// Responsável por atualizar os números da tela.

export function atualizarEstatisticas(catalogo, elementos) {
  elementos.totalMidias.textContent = catalogo.length;

  elementos.totalFilmes.textContent = catalogo.filter(function (midia) {
    return midia.tipo === "Filme";
  }).length;

  elementos.totalSeries.textContent = catalogo.filter(function (midia) {
    return midia.tipo === "Série";
  }).length;

  elementos.totalAssistidos.textContent = catalogo.filter(function (midia) {
    return midia.status === "Já assisti";
  }).length;
}