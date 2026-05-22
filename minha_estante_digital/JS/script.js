let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];

// Pegar os elementos do HTML
const formMidia = document.getElementById("formMidia");
const listaMidias = document.getElementById("listaMidias");
const inputTitulo = document.getElementById("titulo");
const sugestoesFilmes = document.getElementById("sugestoesFilmes");

let filmeSelecionado = null;

const filtroTitulo = document.getElementById("filtroTitulo");
const filtroTipo = document.getElementById("filtroTipo");
const filtroStatus = document.getElementById("filtroStatus");

const totalMidias = document.getElementById("totalMidias");
const totalFilmes = document.getElementById("totalFilmes");
const totalSeries = document.getElementById("totalSeries");
const totalAssistidos = document.getElementById("totalAssistidos");

const API_KEY = "189d5c4b468a5a1c7d509ff62b61a180";
const URL_IMG = "https://image.tmdb.org/t/p/w500";





// Cadastrar uma mídia
formMidia.addEventListener("submit", async function (event) {
  event.preventDefault();

  const titulo = inputTitulo.value.trim();
  const tipo = document.getElementById("tipo").value;
  const status = document.getElementById("status").value;

  if (titulo === "") {
    alert("Digite o título.");
    return;
  }

  if (filmeSelecionado === null) {
    alert("Escolha uma das sugestões antes de adicionar.");
    return;
  }

  const dadosTMDB = await buscarDadosPorIdTMDB(filmeSelecionado.id, tipo);

  const novaMidia = {
    id: Date.now(),
    titulo: filmeSelecionado.title || filmeSelecionado.name,
    tipo,
    status,
    genero: dadosTMDB?.genero || "Não informado",
    plataforma: dadosTMDB?.plataforma || "Não informado",
    nota: dadosTMDB?.nota || "Sem nota",
    comentario: dadosTMDB?.comentario || "Sem descrição",
    poster: dadosTMDB?.poster || ""
  };

  catalogo.push(novaMidia);

  salvarDados();
  renderizarCatalogo();
  atualizarEstatisticas();

  formMidia.reset();
  sugestoesFilmes.innerHTML = "";
  filmeSelecionado = null;
});

async function buscarPlataformas(id, tipoBusca) {
  try {
    const url = `https://api.themoviedb.org/3/${tipoBusca}/${id}/watch/providers?api_key=${API_KEY}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    const brasil = dados.results?.BR;

    if (!brasil || !brasil.flatrate) {
      return "Não informado";
    }

    return brasil.flatrate
      .map(plataforma => plataforma.provider_name)
      .join(", ");

  } catch (erro) {
    console.log("Erro ao buscar plataformas:", erro);
    return "Não informado";
  }
}

async function buscarDadosTMDB(titulo, tipo) {
  try {
    const tipoBusca = tipo === "Filme" ? "movie" : "tv";

    const url = `https://api.themoviedb.org/3/search/${tipoBusca}?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(titulo)}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.results && dados.results.length > 0) {
      const resultado = dados.results[0];

      const detalhesUrl = `https://api.themoviedb.org/3/${tipoBusca}/${resultado.id}?api_key=${API_KEY}&language=pt-BR`;

      const detalhesResposta = await fetch(detalhesUrl);
      const detalhes = await detalhesResposta.json();

      const plataformas = await buscarPlataformas(resultado.id, tipoBusca);

      return {
        poster: resultado.poster_path
          ? URL_IMG + resultado.poster_path
          : "",

        comentario: resultado.overview || "Sem descrição",

        nota: resultado.vote_average
          ? resultado.vote_average.toFixed(1)
          : "Sem nota",

        genero: detalhes.genres
          ? detalhes.genres.map(g => g.name).join(", ")
          : "Não informado",

        plataforma: plataformas
      };
    }

    return null;

  } catch (erro) {
    console.log("Erro ao buscar dados na API:", erro);
    return null;
  }
}
async function buscarSugestoesTMDB(titulo, tipo) {
  try {
    const tipoBusca = tipo === "Filme" ? "movie" : "tv";

    const url = `https://api.themoviedb.org/3/search/${tipoBusca}?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(titulo)}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    sugestoesFilmes.innerHTML = "";

    if (!dados.results || dados.results.length === 0) {
      sugestoesFilmes.innerHTML = `
        <button type="button" class="list-group-item list-group-item-action disabled">
          Nenhum resultado encontrado
        </button>
      `;
      return;
    }

    dados.results.slice(0, 5).forEach(function (resultado) {
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
        filmeSelecionado = resultado;
        inputTitulo.value = tituloResultado;
        sugestoesFilmes.innerHTML = "";
      });

      sugestoesFilmes.appendChild(botao);
    });

  } catch (erro) {
    console.log("Erro ao buscar sugestões:", erro);
  }
}

async function buscarDadosPorIdTMDB(id, tipo) {
  try {
    const tipoBusca = tipo === "Filme" ? "movie" : "tv";

    const detalhesUrl = `https://api.themoviedb.org/3/${tipoBusca}/${id}?api_key=${API_KEY}&language=pt-BR`;

    const detalhesResposta = await fetch(detalhesUrl);
    const detalhes = await detalhesResposta.json();

    const plataformas = await buscarPlataformas(id, tipoBusca);

    return {
      poster: detalhes.poster_path
        ? URL_IMG + detalhes.poster_path
        : "",

      comentario: detalhes.overview || "Sem descrição",

      nota: detalhes.vote_average
        ? detalhes.vote_average.toFixed(1)
        : "Sem nota",

      genero: detalhes.genres
        ? detalhes.genres.map(g => g.name).join(", ")
        : "Não informado",

      plataforma: plataformas
    };

  } catch (erro) {
    console.log("Erro ao buscar dados por ID:", erro);
    return null;
  }
}
inputTitulo.addEventListener("input", function () {
  const titulo = inputTitulo.value.trim();
  const tipo = document.getElementById("tipo").value;

  filmeSelecionado = null;

  if (titulo.length < 3) {
    sugestoesFilmes.innerHTML = "";
    return;
  }

  buscarSugestoesTMDB(titulo, tipo);
});

document.getElementById("tipo").addEventListener("change", function () {
  filmeSelecionado = null;
  sugestoesFilmes.innerHTML = "";
  inputTitulo.value = "";
});
// Salvar os dados
function salvarDados() {
  localStorage.setItem("catalogo", JSON.stringify(catalogo));
}


// Mostrar os cards na tela
function renderizarCatalogo() {
  listaMidias.innerHTML = "";

  const midiasFiltradas = filtrarMidias();

  if (midiasFiltradas.length === 0) {
    listaMidias.innerHTML = `
      <p class="text-center">Nenhuma mídia encontrada.</p>
    `;
    return;
  }

  midiasFiltradas.forEach(function (midia) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card card-midia p-3">
        ${midia.poster ? `<img src="${midia.poster}" class="img-fluid rounded mb-3" alt="${midia.titulo}">` : ""}
        <h4>${midia.titulo}</h4>
        <p><strong>Tipo:</strong> ${midia.tipo}</p>
        <p><strong>Status:</strong> <span class="badge bg-primary badge-status">${midia.status}</span></p>
        <p><strong>Gênero:</strong> ${midia.genero || "Não informado"}</p>
        <p><strong>Plataforma:</strong> ${midia.plataforma || "Não informado"}</p>
        <p><strong>Nota:</strong> ${midia.nota || "Sem nota"}</p>
        <p><strong>Comentário:</strong> ${midia.comentario || "Sem comentário"}</p>
        <p><strong>Status:</strong> ${midia.status || "Não informado"}</p>
        <p><strong>Minha nota:</strong> ${midia.minhaNota || "Não informada"}</p>
        <p><strong>Meu comentário:</strong> ${midia.meuComentario || "Sem comentário"}</p>
        <button onclick="editarMidia(${midia.id})" class="btn btn-warning btn-sm">
        Editar
        </button>
        <button class="btn btn-danger btn-excluir" onclick="excluirMidia(${midia.id})">
          Excluir
        </button>
      </div>
    `;

    listaMidias.appendChild(card);
  });
}

// Fazer os filtros
function filtrarMidias() {
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
// Sempre que o usuário digitar ou mudar um filtro, a lista é atualizada.
filtroTitulo.addEventListener("input", renderizarCatalogo);
filtroTipo.addEventListener("change", renderizarCatalogo);
filtroStatus.addEventListener("change", renderizarCatalogo);



// Excluir uma mídia
function excluirMidia(id) {
  const confirmar = confirm("Tem certeza que deseja excluir esta mídia?");

  if (confirmar) {
    catalogo = catalogo.filter(function (midia) {
      return midia.id !== id;
    });

    salvarDados();
    renderizarCatalogo();
    atualizarEstatisticas();
  }
}

// Atualizar estatísticas
function atualizarEstatisticas() {
  totalMidias.textContent = catalogo.length;

  totalFilmes.textContent = catalogo.filter(function (midia) {
    return midia.tipo === "Filme";
  }).length;

  totalSeries.textContent = catalogo.filter(function (midia) {
    return midia.tipo === "Série";
  }).length;

  totalAssistidos.textContent = catalogo.filter(function (midia) {
    return midia.status === "Já assisti";
  }).length;
}

function editarMidia(id) {
  const midia = catalogo.find(function(item) {
    return item.id === id;
  });

  if (!midia) {
    alert("Filme não encontrado.");
    return;
  }

  const novoStatus = prompt(
    "Digite o status: Quero assistir, Assistindo ou Já assisti",
    midia.status || "Quero assistir"
  );

  if (novoStatus === null) {
    return;
  }

  const novaNota = prompt(
    "Digite sua nota pessoal:",
    midia.minhaNota || ""
  );

  if (novaNota === null) {
    return;
  }

  const novoComentario = prompt(
    "Digite seu comentário:",
    midia.meuComentario || ""
  );

  if (novoComentario === null) {
    return;
  }

  midia.status = novoStatus;
  midia.minhaNota = novaNota;
  midia.meuComentario = novoComentario;

  salvarDados();
  renderizarCatalogo();
  atualizarEstatisticas();
}
// Carregar tudo quando abrir a página
renderizarCatalogo();
atualizarEstatisticas();