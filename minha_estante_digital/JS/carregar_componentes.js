async function carregarComponente(idElemento, caminhoArquivo) {
  const elemento = document.getElementById(idElemento);

  if (!elemento) {
    console.error(`Elemento com id "${idElemento}" não encontrado.`);
    return;
  }

  try {
    const resposta = await fetch(caminhoArquivo);

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar ${caminhoArquivo}`);
    }

    const html = await resposta.text();
    elemento.innerHTML = html;

  } catch (erro) {
    console.error("Erro ao carregar componente:", erro);
  }
}

async function carregarTodosComponentes() {
  await carregarComponente("areaHeader", "componentes/header.html");
  await carregarComponente("areaFormulario", "componentes/formulario.html");
  await carregarComponente("areaFiltros", "componentes/filtros.html");
  await carregarComponente("areaEstatisticas", "componentes/estatisticas.html");
  await carregarComponente("areaCatalogo", "componentes/catalogo.html");

  // Depois que todos os componentes foram carregados,
  // o JavaScript principal da aplicação é iniciado.
  await import("./main.js");
}

carregarTodosComponentes();