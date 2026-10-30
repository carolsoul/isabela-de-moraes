# 🌟 Portfólio Interativo - Isabela Moraes

Este projeto é uma landing page pessoal construída com **React**, com foco em animações interativas usando **GSAP (GreenSock Animation Platform)**.

O objetivo é apresentar a trajetória profissional e projetos de forma dinâmica e criativa, integrando conceitos de **planejamento criativo**, **publicidade** e **live marketing**.

- [Link do Projeto hospedado](https://isabela-de-moraes.netlify.app/)
---

## 🚀 Funcionalidades

- 🎬 Intro com cortina preta em 7 colunas (GSAP), exibida só na primeira visita da sessão
- ✨ Hero tipográfico animado: "isa [imagem] bela" com as imagens dos projetos em loop
- 🧭 Header fixo que vira uma pílula escura ao rolar, com menu em tela cheia
- 👋 Sobre com o momento atual, competências e trajetória
- 🖼️ Trabalhos selecionados em cards, cada um com página própria (`/trabalhos/:slug`): desafio, ideia, papel e impacto
- 🎓 Destaque para o TCC "Adidas x Farm Rio"
- 🎞️ Faixa horizontal de vídeos fixada no scroll (`GSAP ScrollTrigger`)
- 💡 Serviços e footer de contato com acentos em verde-oliva
- 📱 Design responsivo e respeito à preferência de movimento reduzido

### Onde editar o conteúdo

- `src/data/projects.js`: trabalhos (cards e páginas)
- `src/data/videos.js`: vídeos da faixa horizontal
- `src/data/contact.js`: e-mail, WhatsApp, LinkedIn, currículo e seções do menu
- `src/components/Thesis.jsx`: texto e link do TCC

---

## 🛠️ Tecnologias

- [React](https://react.dev/) + [React Router](https://reactrouter.com/)
- [GSAP + ScrollTrigger](https://greensock.com/scrolltrigger/)
- HTML5 + CSS3 (customizado)
- JavaScript (ES6+)

---

## 📂 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/carolsoul/isabela-de-moraes.git

# Acesse o diretório
cd isabela-de-moraes

# Instale as dependências
npm install

# Rode a aplicação
npm run dev
