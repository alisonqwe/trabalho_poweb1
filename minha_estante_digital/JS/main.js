// 
// console.log("main.js carregou");
import { carregarCatalogo, salvarCatalogo } from "./storage.js";
import { buscarSugestoesTMDB, buscarDadosPorIdTMDB } from "./apiTMDB.js";
import { criarMidia, excluirMidia as removerMidia, editarMidia as alterarMidia } from "./catalogo.js";
import { filtrarMidias } from "./filtros.js";
import { atualizarEstatisticas } from "./estatisticas.js";
import { mostrarSugestoes, renderizarCatalogo } from "./interface.js";
import { salvarCookie, lerCookie } from "./cookies.js";
import { inicializarLogin, fazerLogout } from "./login.js";

inicializarLogin();

const logado = sessionStorage.getItem("logado");

if (logado === "true") {

  const usuario =
    localStorage.getItem("usuario");

  console.log(`Usuário ${usuario} autenticado`);

}

salvarCookie(
  "ultima_visita",
  new Date().toLocaleString(),
  7
);
const ultimaPesquisa = lerCookie("ultimaPesquisa");
const tipoPreferido = lerCookie("tipoPreferido");

console.log("Última pesquisa:", ultimaPesquisa);
console.log("Tipo preferido:", tipoPreferido);
let catalogo = carregarCatalogo();
let filmeSelecionado = null;

// Elementos do formulário mapeia
const formMidia = document.getElementById("formMidia");
const inputTitulo = document.getElementById("titulo");
const inputTipo = document.getElementById("tipo");
const inputStatus = document.getElementById("status");
const sugestoesFilmes = document.getElementById("sugestoesFilmes");

// Elementos dos filtros
const filtroTitulo = document.getElementById("filtroTitulo");
const filtroTipo = document.getElementById("filtroTipo");
const filtroStatus = document.getElementById("filtroStatus");

// Área dos cards
const listaMidias = document.getElementById("listaMidias");

// Elementos das estatísticas
const elementosEstatisticas = {
  totalMidias: document.getElementById("totalMidias"),
  totalFilmes: document.getElementById("totalFilmes"),
  totalSeries: document.getElementById("totalSeries"),
  totalAssistidos: document.getElementById("totalAssistidos")
};

function atualizarTela() {
  const midiasFiltradas = filtrarMidias(
    catalogo,
    filtroTitulo,
    filtroTipo,
    filtroStatus
  );

  renderizarCatalogo(midiasFiltradas, listaMidias);
  atualizarEstatisticas(catalogo, elementosEstatisticas);
}

formMidia.addEventListener("submit", async function (event) {
  event.preventDefault();

  const titulo = inputTitulo.value.trim();
  const tipo = inputTipo.value;
  const status = inputStatus.value;

  if (titulo === "") {
    alert("Digite o título.");
    return;
  }

  if (filmeSelecionado === null) {
    alert("Escolha uma das sugestões antes de adicionar.");
    return;
  }

  const dadosTMDB = await buscarDadosPorIdTMDB(filmeSelecionado.id, tipo);

  const novaMidia = criarMidia(
    filmeSelecionado,
    tipo,
    status,
    dadosTMDB
  );

  catalogo.push(novaMidia);

  salvarCatalogo(catalogo);
  atualizarTela();

  formMidia.reset();
  sugestoesFilmes.innerHTML = "";
  filmeSelecionado = null;
});

inputTitulo.addEventListener("input", async function () {
  const titulo = inputTitulo.value.trim();
  const tipo = inputTipo.value;

  filmeSelecionado = null;

  if (titulo.length < 3) {
    sugestoesFilmes.innerHTML = "";
    return;
  }


  salvarCookie("ultimaPesquisa", titulo, 30);
  salvarCookie("tipoPreferido", tipo, 30);
  const resultados = await buscarSugestoesTMDB(titulo, tipo);

  mostrarSugestoes(
    resultados,
    sugestoesFilmes,
    inputTitulo,
    function (resultadoSelecionado) {
      filmeSelecionado = resultadoSelecionado;
    }
  );
});

inputTipo.addEventListener("change", function () {
  filmeSelecionado = null;
  sugestoesFilmes.innerHTML = "";
  inputTitulo.value = "";
});

filtroTitulo.addEventListener("input", atualizarTela);
filtroTipo.addEventListener("change", atualizarTela);
filtroStatus.addEventListener("change", atualizarTela);

// Essas funções ficam disponíveis para os botões criados no HTML dos cards
window.excluirMidia = function (id) {
  catalogo = removerMidia(catalogo, id);

  salvarCatalogo(catalogo);
  atualizarTela();
};

window.editarMidia = function (id) {
  const editou = alterarMidia(catalogo, id);

  if (editou) {
    salvarCatalogo(catalogo);
    atualizarTela();
  }
};

// Carrega os dados quando a página abre
atualizarTela();



const btnLogout = document.getElementById("btnLogout");
console.log("Botão logout:", btnLogout);
if (btnLogout) {

  btnLogout.addEventListener("click", () => {
    fazerLogout();

  });

}