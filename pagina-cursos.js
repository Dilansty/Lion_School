import { getCursos, getAlunos, getAlunoPorId } from "./api.js";

// Exemplo 1: renderizar os botões de curso (DS / REDES) dinamicamente
async function carregarCursos() {
  try {
    const cursos = await getCursos();
    console.log("Cursos:", cursos); // veja no console o formato real dos dados

    const container = document.querySelector(".cursos-container");
    container.innerHTML = "";

    cursos.forEach((curso) => {
      const botao = document.createElement("button");
      botao.className = "btn-curso";
      botao.textContent = curso.nome; // ajuste o campo conforme o retorno real
      botao.addEventListener("click", () => carregarAlunosDoCurso(curso.id));
      container.appendChild(botao);
    });
  } catch (erro) {
    console.error("Não foi possível carregar os cursos.", erro);
  }
}

// Exemplo 2: ao clicar em DS ou REDES, buscar os alunos daquele curso
async function carregarAlunosDoCurso(cursoId) {
  try {
    const alunos = await getAlunos({ cursoId });
    console.log(`Alunos do curso ${cursoId}:`, alunos);
    // aqui você renderiza a lista de alunos na tela
  } catch (erro) {
    console.error("Não foi possível carregar os alunos.", erro);
  }
}

// Exemplo 3: detalhes de um aluno específico
async function verDetalhesAluno(id) {
  try {
    const aluno = await getAlunoPorId(id);
    console.log("Detalhes do aluno:", aluno);
  } catch (erro) {
    console.error("Não foi possível carregar o aluno.", erro);
  }
}

document.addEventListener("DOMContentLoaded", carregarCursos);
