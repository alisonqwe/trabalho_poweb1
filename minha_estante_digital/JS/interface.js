// O interface.js é responsável por atualizar a parte visual da aplicação. Nele ficam as funções que criam os cards, mostram mensagens na tela e exibem as sugestões de filmes e séries.


export function mostrarSugestoes(resultados, sugestoesFilmes, inputTitulo, aoSelecionarFilme) {
  sugestoesFilmes.innerHTML = "";

  if (!resultados || resultados.length === 0) {
    sugestoesFilmes.innerHTML = `
      <button type="button" class="list-group-item list-group-item-action disabled">
        Nenhum resultado encontrado
      </button>
    `;
    return;
  }

  resultados.slice(0, 5).forEach(function (resultado) {
    const tituloResultado = resultado.title || resultado.name;
    const data = resultado.release_date || resultado.first_air_date;
    const ano = data ? data.substring(0, 4) : "Ano não informado";

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "list-group-item list-group-item-action text-start";

    botao.innerHTML = `
      <strong>${tituloResultado}</strong><br>
      <small>${ano}</small>
    `;

    botao.addEventListener("click", function () {
      aoSelecionarFilme(resultado);
      inputTitulo.value = tituloResultado;
      sugestoesFilmes.innerHTML = "";
    });

    sugestoesFilmes.appendChild(botao);
  });
}

export function renderizarCatalogo(midias, listaMidias) {
  listaMidias.innerHTML = "";

  if (midias.length === 0) {
    listaMidias.innerHTML = `
      <p class="text-center">Nenhuma mídia encontrada.</p>
    `;
    return;
  }

  midias.forEach(function (midia) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card card-midia p-3">
        ${midia.poster ? `<img src="${midia.poster}" class="img-fluid rounded mb-3" alt="${midia.titulo}">` : ""}

        <h4>${midia.titulo}</h4>

        <p><strong>Tipo:</strong> ${midia.tipo}</p>

        <p>
          <strong>Status:</strong>
          <span class="badge bg-primary badge-status">${midia.status}</span>
        </p>

        <p><strong>Gênero:</strong> ${midia.genero || "Não informado"}</p>
        <p><strong>Plataforma:</strong> ${midia.plataforma || "Não informado"}</p>
        <p><strong>Nota:</strong> ${midia.nota || "Sem nota"}</p>
        <p><strong>Comentário:</strong> ${midia.comentario || "Sem comentário"}</p>
        <p><strong>Minha nota:</strong> ${midia.minhaNota || "Não informada"}</p>
        <p><strong>Meu comentário:</strong> ${midia.meuComentario || "Sem comentário"}</p>

        <button onclick="editarMidia(${midia.id})" class="btn btn-warning btn-sm mb-2">
          Editar
        </button>

        <button onclick="excluirMidia(${midia.id})" class="btn btn-danger btn-excluir">
          Excluir
        </button>
      </div>
    `;

    listaMidias.appendChild(card);
  });
}                                                      