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



explicação do js :
main.js → inicia o sistema e conecta os outros arquivos
apiTMDB.js → busca dados na API do TMDB
storage.js → salva e carrega dados no LocalStorage
catalogo.js → cria, edita e exclui mídias
filtros.js → filtra as mídias cadastradas
estatisticas.js → atualiza os contadores da tela
interface.js → renderiza sugestões e cards na tela


Para deixar o HTML mais organizado, separamos a interface em pequenos componentes HTML. O index.html ficou responsável apenas por definir as áreas principais da página. Depois, o arquivo carregarComponentes.js usa fetch() para carregar cada parte da interface, como cabeçalho, formulário, filtros, estatísticas e catálogo.

Depois que esses componentes são carregados, o main.js é importado para iniciar a lógica da aplicação. Isso evita erro, porque o JavaScript principal só roda depois que todos os elementos HTML já existem na tela.


index.html → define onde os componentes entram
header.html → cabeçalho
formulario.html → formulário de cadastro
filtros.html → filtros da aplicação
estatisticas.html → cards de estatísticas
catalogo.html → área onde aparecem os cards
carregarComponentes.js → carrega os componentes com fetch()
main.js → inicia a lógica da aplicação


Essa separação deixa o projeto mais organizado, porque cada parte da interface fica em um arquivo específico. Assim, se eu quiser alterar o formulário, mexo apenas em formulario.html; se quiser alterar os filtros, mexo apenas em filtros.html; e se quiser alterar o cabeçalho, mexo apenas em header.html.


A estrutura do projeto foi separada por responsabilidade. O index.html é a página principal, mas ele não guarda todo o HTML diretamente. As partes visuais foram separadas na pasta components, como cabeçalho, formulário, filtros, estatísticas e catálogo.

A pasta CSS guarda o estilo personalizado. A pasta JS guarda a lógica da aplicação, também separada por responsabilidade. O main.js inicia o sistema, o apiTMDB.js cuida da API, o storage.js cuida do LocalStorage, o interface.js monta os cards, o filtros.js aplica os filtros e o estatisticas.js atualiza os contadores.
-------------------------------------------------------
explicação do bootstrap
O Bootstrap fica dentro da pasta dependencias, então o projeto usa o framework localmente.

Bootstrap é um framework CSS, ou seja, uma biblioteca pronta que já vem com várias classes para deixar a página mais organizada e bonita sem você precisar escrever tudo no CSS manualmente.

<main class="container my-4">

A classe:

container

vem do Bootstrap.

Ela serve para centralizar o conteúdo e não deixar tudo grudado nas bordas da tela.

2. O Bootstrap divide a tela em colunas

Essa é a parte mais importante.

No formulário, você usa:

<div class="row">
  <div class="col-md-6 mb-3">
  <div class="col-md-3 mb-3">
  <div class="col-md-3 mb-3">
</div>


O Bootstrap foi usado como framework CSS para facilitar a construção da interface. Ele fornece classes prontas para layout, formulários, botões, cards e espaçamentos.

No projeto, usamos o sistema de grid do Bootstrap, que divide a tela em 12 colunas. Por exemplo, no formulário usamos col-md-6, col-md-3 e col-md-3, somando 12 colunas. Isso organiza os campos na mesma linha.

Também usamos classes como container, row, card, btn, form-control e form-select. Assim, o Bootstrap cuida da base visual e da organização, enquanto o nosso CSS próprio personaliza cores, sombras e bordas.

A pasta dependencias guarda bibliotecas externas utilizadas pelo sistema. Neste projeto, ela armazena o Bootstrap localmente, responsável pelo layout, formulários, botões, cards e responsividade.