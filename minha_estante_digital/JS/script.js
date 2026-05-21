let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];

// Pegar os elementos do HTML
const formMidia = document.getElementById("formMidia");
const listaMidias = document.getElementById("listaMidias");

const filtroTitulo = document.getElementById("filtroTitulo");
const filtroTipo = document.getElementById("filtroTipo");
const filtroStatus = document.getElementById("filtroStatus");

const totalMidias = document.getElementById("totalMidias");
const totalFilmes = document.getElementById("totalFilmes");
const totalSeries = document.getElementById("totalSeries");
const totalAssistidos = document.getElementById("totalAssistidos");





// Cadastrar uma mídia
formMidia.addEventListener("submit", function(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const tipo = document.getElementById("tipo").value;
  const status = document.getElementById("status").value;
  const genero = document.getElementById("genero").value.trim();
  const plataforma = document.getElementById("plataforma").value.trim();
  const nota = document.getElementById("nota").value;
  const comentario = document.getElementById("comentario").value.trim();

  if (titulo === "") {
    alert("Digite o título da mídia.");
    return;
  }

  const novaMidia = {
    id: Date.now(),
    titulo,
    tipo,
    status,
    genero,
    plataforma,
    nota,
    comentario
  };

  catalogo.push(novaMidia);
  salvarDados();
  renderizarCatalogo();
  atualizarEstatisticas();

  formMidia.reset();
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

  midiasFiltradas.forEach(function(midia) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card card-midia p-3">
        <h4>${midia.titulo}</h4>
        <p><strong>Tipo:</strong> ${midia.tipo}</p>
        <p><strong>Status:</strong> <span class="badge bg-primary badge-status">${midia.status}</span></p>
        <p><strong>Gênero:</strong> ${midia.genero || "Não informado"}</p>
        <p><strong>Plataforma:</strong> ${midia.plataforma || "Não informado"}</p>
        <p><strong>Nota:</strong> ${midia.nota || "Sem nota"}</p>
        <p><strong>Comentário:</strong> ${midia.comentario || "Sem comentário"}</p>

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

  return catalogo.filter(function(midia) {
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
    catalogo = catalogo.filter(function(midia) {
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

  totalFilmes.textContent = catalogo.filter(function(midia) {
    return midia.tipo === "Filme";
  }).length;

  totalSeries.textContent = catalogo.filter(function(midia) {
    return midia.tipo === "Série";
  }).length;

  totalAssistidos.textContent = catalogo.filter(function(midia) {
    return midia.status === "Já assisti";
  }).length;
}
// Carregar tudo quando abrir a página
renderizarCatalogo();
atualizarEstatisticas();