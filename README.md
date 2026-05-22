# Minha Estante Digital

Projeto desenvolvido para a disciplina de **Programação para Web**.

A aplicação permite cadastrar filmes e séries, buscar informações automaticamente pela **API do TMDB**, exibir sugestões de títulos, salvar os dados no navegador e editar informações como status, nota pessoal e comentário.

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- API TMDB
- LocalStorage

---

## Como executar o projeto

Para executar o projeto, basta abrir o arquivo `index.html` no navegador.

Recomenda-se abrir o projeto utilizando a extensão **Live Server** no Visual Studio Code.

### Passos para execução

1. Abrir a pasta do projeto no VS Code.
2. Clicar com o botão direito no arquivo `index.html`.
3. Selecionar a opção `Open with Live Server`.

---

## Sobre a pasta `dependencias`

A pasta `dependencias` guarda arquivos externos usados pelo projeto.

Neste projeto, ela contém o Bootstrap local:

```txt
dependencias/bootstrap/css/bootstrap.min.css
```

O **Bootstrap** é uma biblioteca CSS usada para melhorar a aparência da interface, botões, formulários e cards.

O arquivo está sendo carregado no `index.html` por este caminho:

```html
<link href="dependencias/bootstrap/css/bootstrap.min.css" rel="stylesheet">
```

Dessa forma, o projeto não depende do link online do Bootstrap para carregar o estilo principal.

A pasta `dependencias` contém o Bootstrap local utilizado pelo projeto. Assim, o arquivo CSS do Bootstrap fica salvo junto com o projeto, evitando depender diretamente do link CDN para carregar a estilização.

---

## Estrutura do projeto

```txt
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
```

---

## Observação importante

A busca de filmes e séries usa a API do TMDB. Por isso, para buscar sugestões e informações dos títulos, é necessário estar conectado à internet.

Mesmo com o Bootstrap salvo localmente na pasta `dependencias`, a API do TMDB ainda precisa de internet para buscar os dados dos filmes e séries.

---

## Funcionalidades

O sistema possui as seguintes funcionalidades:

- Cadastrar filmes e séries.
- Buscar sugestões de títulos pelo nome.
- Selecionar um filme ou série da lista de sugestões.
- Adicionar o título ao catálogo.
- Exibir informações como gênero, nota, plataforma e descrição.
- Editar status, nota pessoal e comentário.
- Remover títulos cadastrados.
- Salvar os dados no navegador usando LocalStorage.

---

## Compatibilidade

O projeto foi organizado para funcionar tanto em **Windows** quanto em **Linux**.

No Linux, é importante observar que nomes de arquivos e pastas diferenciam letras maiúsculas e minúsculas. Por isso, os caminhos utilizados no código devem estar exatamente iguais aos nomes reais das pastas.

Exemplo:

```html
<link rel="stylesheet" href="CSS/style.css">
<script src="JS/script.js"></script>
```

Se as pastas forem chamadas `CSS` e `JS`, os caminhos devem permanecer exatamente dessa forma.

---

## Como acontece a busca com os dados dos filmes?

O projeto busca os dados usando a **API do TMDB**.

Quando o usuário digita o nome de um filme ou série, o JavaScript pega esse texto e faz uma requisição para a API usando `fetch`.

A API retorna uma lista de resultados parecidos com o nome digitado. Depois, o sistema mostra essas sugestões na tela.

Quando o usuário escolhe uma sugestão, o projeto usa o `id` daquele filme para buscar os detalhes completos, como gênero, nota, descrição, pôster e plataformas.

### Exemplo de busca pelo nome digitado

```js
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${titulo}`;
```

Essa parte faz a busca pelo nome digitado.

Depois que o usuário escolhe um filme, o sistema usa o `id` desse filme para buscar mais informações.

### Exemplo de busca pelos detalhes do filme

```js
const detalhesUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`;
```

---

## Fluxo de funcionamento da busca

```txt
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
```

---

## Uso da internet no projeto

A busca dos filmes precisa de internet, porque os dados vêm da API online do TMDB.

O Bootstrap pode estar salvo localmente na pasta `dependencias`, mas os dados dos filmes continuam vindo da internet.

Portanto:

- O Bootstrap está salvo localmente dentro do projeto.
- A busca de filmes e séries depende da internet.
- Os dados são carregados a partir da API TMDB.

---

## Armazenamento dos dados

Os dados cadastrados são salvos no navegador utilizando **LocalStorage**.

Isso permite que os filmes e séries adicionados continuem salvos mesmo após atualizar ou fechar a página, desde que o usuário continue no mesmo navegador e não limpe os dados armazenados.

---

## Considerações finais

Este projeto utiliza HTML, CSS e JavaScript para criar uma aplicação web interativa.

Além disso, faz uso do Bootstrap para melhorar a interface, da API TMDB para buscar dados de filmes e séries, e do LocalStorage para salvar as informações cadastradas pelo usuário no navegador.