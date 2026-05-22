# Minha Estante Digital

Projeto desenvolvido para a disciplina de Programação para Web.

A aplicação permite cadastrar filmes e séries, buscar informações automaticamente pela API do TMDB, exibir sugestões de títulos, salvar os dados no navegador e editar informações como status, nota pessoal e comentário.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- API TMDB
- LocalStorage



## Como executar o projeto

Para executar o projeto, basta abrir o arquivo `index.html` no navegador.

Recomendado abrir com a extensão Live Server no VS Code.

Passos:

1. Abrir a pasta do projeto no VS Code.
2. Clicar com o botão direito no arquivo `index.html`.
3. Selecionar a opção `Open with Live Server`.

## Sobre a pasta dependencias

A pasta `dependencias` guarda arquivos externos usados pelo projeto.

Neste projeto, ela contém o Bootstrap local:

```txt
dependencias/bootstrap/css/bootstrap.min.css
O Bootstrap é uma biblioteca CSS usada para melhorar a aparência da interface, botões, formulários e cards.
O arquivo está sendo carregado no index.html por este caminho: <link href="dependencias/bootstrap/css/bootstrap.min.css" rel="stylesheet">
Dessa forma, o projeto não depende do link online do Bootstrap para carregar o estilo principal.

## Estrutura do projeto

minha_estante_digital/
├── index.html
├── README.md
├── CSS/
│   └── style.css
├── JS/
│   └── script.js
└── dependencias/
    └── bootstrap/
        └── css/
            └── bootstrap.min.css


Observação importante

A busca de filmes e séries usa a API do TMDB. Por isso, para buscar sugestões e informações dos títulos, é necessário estar conectado à internet.

Mesmo com o Bootstrap salvo localmente na pasta dependencias, a API do TMDB ainda precisa de internet para buscar os dados dos filmes e séries.

Funcionalidades
Cadastrar filmes e séries.
Buscar sugestões de títulos pelo nome.
Selecionar um filme ou série da lista de sugestões.
Adicionar o título ao catálogo.
Exibir informações como gênero, nota, plataforma e descrição.
Editar status, nota pessoal e comentário.
Remover títulos cadastrados.
Salvar os dados no navegador usando LocalStorage.
Compatibilidade

O projeto foi organizado para funcionar tanto em Windows quanto em Linux.


A pasta dependencias contém o Bootstrap local utilizado pelo projeto. Assim, o arquivo CSS do Bootstrap fica salvo junto com o projeto, evitando depender diretamente do link CDN para carregar a estilização.


## COMO ACONTECE A BUSCA COM OS DADOS DOS FILMES ?
O projeto busca os dados usando a API do TMDB. Quando o usuário digita o nome de um filme ou série, o JavaScript pega esse texto e faz uma requisição para a API usando fetch. A API retorna uma lista de resultados parecidos com o nome digitado. Depois o sistema mostra essas sugestões na tela. Quando o usuário escolhe uma sugestão, o projeto usa o id daquele filme para buscar os detalhes completos, como gênero, nota, descrição, pôster e plataformas.

const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${titulo}`;
Essa parte faz a busca pelo nome digitado.
Depois que o usuário escolhe um filme, o sistema usa o id desse filme para buscar mais informações: const detalhesUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`;

Então o funcionamento é:
Usuário digita o nome
        ↓
JavaScript captura o texto
        ↓
fetch envia a busca para a API TMDB
        ↓
API retorna sugestões
        ↓
Usuário escolhe uma sugestão
        ↓
Sistema busca os detalhes pelo ID
        ↓
Filme é adicionado ao catálogo


A busca dos filmes precisa de internet, porque os dados vêm da API online do TMDB. O Bootstrap pode estar salvo localmente na pasta dependencias, mas os dados dos filmes continuam vindo da internet.