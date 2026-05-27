// Responsável por buscar dados na API do TMDB.

const API_KEY = "189d5c4b468a5a1c7d509ff62b61a180";
const URL_IMG = "https://image.tmdb.org/t/p/w500";

export async function buscarPlataformas(id, tipoBusca) {
  try {
    const url = `https://api.themoviedb.org/3/${tipoBusca}/${id}/watch/providers?api_key=${API_KEY}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    const brasil = dados.results?.BR;

    if (!brasil || !brasil.flatrate) {
      return "Não informado";
    }

    return brasil.flatrate
      .map(function (plataforma) {
        return plataforma.provider_name;
      })
      .join(", ");

  } catch (erro) {
    console.log("Erro ao buscar plataformas:", erro);
    return "Não informado";
  }
}

export async function buscarSugestoesTMDB(titulo, tipo) {
  try {
    const tipoBusca = tipo === "Filme" ? "movie" : "tv";

    const url = `https://api.themoviedb.org/3/search/${tipoBusca}?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(titulo)}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados.results || [];

  } catch (erro) {
    console.log("Erro ao buscar sugestões:", erro);
    return [];
  }
}

export async function buscarDadosPorIdTMDB(id, tipo) {
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
        ? detalhes.genres.map(function (genero) {
            return genero.name;
          }).join(", ")
        : "Não informado",

      plataforma: plataformas
    };

  } catch (erro) {
    console.log("Erro ao buscar dados por ID:", erro);
    return null;
  }
}