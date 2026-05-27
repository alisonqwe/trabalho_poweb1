// Responsável por criar, editar e excluir mídias.

export function criarMidia(filmeSelecionado, tipo, status, dadosTMDB) {
  return {
    id: Date.now(),
    titulo: filmeSelecionado.title || filmeSelecionado.name,
    tipo: tipo,
    status: status,
    genero: dadosTMDB?.genero || "Não informado",
    plataforma: dadosTMDB?.plataforma || "Não informado",
    nota: dadosTMDB?.nota || "Sem nota",
    comentario: dadosTMDB?.comentario || "Sem descrição",
    poster: dadosTMDB?.poster || ""
  };
}

export function excluirMidia(catalogo, id) {
  const confirmar = confirm("Tem certeza que deseja excluir esta mídia?");

  if (!confirmar) {
    return catalogo;
  }

  return catalogo.filter(function (midia) {
    return midia.id !== id;
  });
}

export function editarMidia(catalogo, id) {
  const midia = catalogo.find(function (item) {
    return item.id === id;
  });

  if (!midia) {
    alert("Filme não encontrado.");
    return false;
  }

  const novoStatus = prompt(
    "Digite o status: Quero ver, Assistindo ou Já assisti",
    midia.status || "Quero ver"
  );

  if (novoStatus === null) {
    return false;
  }

  const novaNota = prompt(
    "Digite sua nota pessoal:",
    midia.minhaNota || ""
  );

  if (novaNota === null) {
    return false;
  }

  const novoComentario = prompt(
    "Digite seu comentário:",
    midia.meuComentario || ""
  );

  if (novoComentario === null) {
    return false;
  }

  midia.status = novoStatus;
  midia.minhaNota = novaNota;
  midia.meuComentario = novoComentario;

  return true;
}