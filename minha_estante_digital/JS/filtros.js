
// Responsável pelos filtros.

export function filtrarMidias(catalogo, filtroTitulo, filtroTipo, filtroStatus) {
  const textoTitulo = filtroTitulo.value.toLowerCase();
  const tipoSelecionado = filtroTipo.value;
  const statusSelecionado = filtroStatus.value;

  return catalogo.filter(function (midia) {
    const tituloCombina = midia.titulo.toLowerCase().includes(textoTitulo);
    const tipoCombina = tipoSelecionado === "" || midia.tipo === tipoSelecionado;
    const statusCombina = statusSelecionado === "" || midia.status === statusSelecionado;

    return tituloCombina && tipoCombina && statusCombina;
  });
}