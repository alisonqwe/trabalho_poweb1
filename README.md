# 🎬 Minha Estante Digital

Projeto desenvolvido para a disciplina de **Programação para Web**, com o objetivo de permitir o gerenciamento de filmes e séries de forma simples, organizada e intuitiva.

A aplicação permite ao usuário cadastrar mídias, buscar informações automaticamente através da API do **TMDB (The Movie Database)**, visualizar detalhes dos títulos e manter um catálogo pessoal salvo no navegador.

---

# 📌 Objetivo do Projeto

O sistema foi criado para auxiliar usuários a organizarem filmes e séries que desejam assistir, estão assistindo ou já assistiram, permitindo um controle pessoal das mídias consumidas.

Além disso, o projeto utiliza uma API externa para automatizar a busca de informações, tornando o cadastro mais rápido e prático.

---

# ✨ Funcionalidades

O sistema possui as seguintes funcionalidades:

✅ Cadastro de filmes e séries  
✅ Busca automática de títulos utilizando a API TMDB  
✅ Sugestões automáticas durante a digitação  
✅ Exibição de informações do título selecionado  
✅ Exibição de gênero da mídia  
✅ Exibição da nota do TMDB  
✅ Exibição das plataformas de streaming disponíveis  
✅ Exibição de pôster do filme/série  
✅ Sistema de filtros por:

- Título
- Tipo (Filme/Série)
- Status

✅ Estatísticas do catálogo:

- Total de mídias
- Total de filmes
- Total de séries
- Total de mídias assistidas

✅ Alteração de status das mídias cadastradas  
✅ Remoção de mídias do catálogo  
✅ Salvamento automático utilizando **LocalStorage**

---

# 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **HTML5** → estrutura da aplicação
- **CSS3** → estilização da interface
- **JavaScript (ES6+)** → lógica do sistema
- **Bootstrap** → responsividade e componentes visuais
- **TMDB API** → busca automática de informações sobre filmes e séries
- **LocalStorage** → persistência dos dados no navegador

---

# 📂 Estrutura do Projeto

```txt
minha_estante_digital/
│
├── index.html
│
├── CSS/
│   └── style.css
│
├── JS/
│   └── script.js
│
├── dependencias/
│   └── bootstrap/
│       └── css/
│           └── bootstrap.min.css
│
└── README.md
```


---

# 🌐 Integração com API

O sistema utiliza a API do **TMDB (The Movie Database)** para buscar automaticamente informações sobre filmes e séries.

A API é responsável por fornecer:

* Nome do título
* Gênero
* Nota de avaliação
* Descrição
* Imagem do pôster
* Plataformas de streaming disponíveis

Para obter as plataformas de streaming, o sistema realiza uma segunda requisição utilizando o **ID do filme ou série**, retornando os provedores disponíveis no Brasil.

---

# 💾 Armazenamento de Dados

Os dados cadastrados pelo usuário são armazenados utilizando **LocalStorage**, permitindo que as informações permaneçam salvas no navegador mesmo após fechar ou atualizar a página.

---

# ▶️ Como Executar o Projeto

1. Baixe ou clone o projeto

2. Abra a pasta no Visual Studio Code

3. Execute o arquivo `index.html`

Ou utilize a extensão **Live Server** no VS Code para uma melhor experiência.

---

# 👨‍💻 Disciplina

**Programação para Web**

Projeto acadêmico desenvolvido para fins educacionais.
