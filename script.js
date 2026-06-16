
//login 

const usuarios = [
  {
    email: "miguel@email.com",
    senha: "123456",
  },
  {
    email: "snadya@email.com",
    senha: "123456",
  },
  {
    email: "sid@email.com",
    senha: "123456",
  },
  {
    email: "junior@email.com",
    senha: "123456",
  },
];

function validarLogin() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email &&  usuario.senha === senha);

  if (usuarioEncontrado) {
    
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    mostrarApp();
  } else {
    alert("Email ou senha inválidos.");
  }
}

function mostrarApp() {
  const loginScreen = document.getElementById("login-screen");
  const app = document.getElementById("app");

  if (loginScreen) {
    loginScreen.style.display = "none";
  }

  if (app) {
    app.classList.remove("hidden");
    app.style.display = "flex";
  }
}

function fazerLogout() {
  localStorage.removeItem("usuarioLogado");

  document.getElementById("app").style.display = "none";

  document.getElementById("login-screen").style.display = "flex";

  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";
}

function verificarLogin() {
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (usuarioLogado) {
    mostrarApp();
  }
}


// ======================================
// NAVEGAÇÃO
// ======================================

function navegarPara(secao) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
    section.hidden = true;
  });

  const destino = document.getElementById(`section-${secao}`);

  if (destino) {
    destino.hidden = false;
    destino.classList.add("active");
  }
}

// ======================================
// POMODORO
// ======================================

let tempo = 25 * 60;

let contagemTempo = null;

let modoAtual = "foco";

const tempos = {
  foco: 1500,
  pausa: 300,
  pausaLonga: 900,
};

function atualizarDisplay() {
  const minutos = Math.floor(tempo / 60);

  const segundos = tempo % 60;

  document.getElementById("timer-display").textContent = `${String(
    minutos
  ).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function iniciarPomodoro() {
  if (contagemTempo) return;

  contagemTempo = setInterval(() => {
    tempo--;

    atualizarDisplay();

    if (tempo <= 0) {
      clearInterval(contagemTempo);

      contagemTempo = null;
    }
  }, 1000);
}

function pausarPomodoro() {
  clearInterval(contagemTempo);

  contagemTempo = null;
}

function reiniciarPomodoro() {
  pausarPomodoro();

  tempo = tempos[modoAtual];

  atualizarDisplay();
}

function selecionarModoPomodoro(modo) {
  modoAtual = modo;

  pausarPomodoro();

  tempo = tempos[modo];

  atualizarDisplay();

  document
    .querySelectorAll(".mode-btn")
    .forEach((btn) => btn.classList.remove("active"));

  const botao = document.querySelector(`[data-mode="${modo}"]`);

  if (botao) botao.classList.add("active");
}

// ======================================
// TAREFAS
// ======================================

const tarefas = [];

function abrirModalNovaTarefa() {
  document.getElementById("modal-tarefa").classList.remove("hidden");
}

function fecharModalNovaTarefa() {
  document.getElementById("modal-tarefa").classList.add("hidden");
}

function salvarTarefa() {
  const tarefa = {
    id: Date.now(),

    titulo: document.getElementById("modal-tarefa-titulo").value,

    descricao: document.getElementById("modal-tarefa-desc").value,

    data: document.getElementById("modal-tarefa-data").value,

    status: document.getElementById("modal-tarefa-status").value,

    tag: document.getElementById("modal-tarefa-tag").value,
  };

  tarefas.push(tarefa);

  renderizarTarefa(tarefa);

  atualizarContadores();

  atualizarProgresso();

  limparFormulario();

  fecharModalNovaTarefa();
}

function limparFormulario() {
  [
    "modal-tarefa-titulo",
    "modal-tarefa-desc",
    "modal-tarefa-data",
    "modal-tarefa-status",
    "modal-tarefa-tag",
  ].forEach((id) => {
    document.getElementById(id).value = "";
  });
}

function renderizarTarefa(tarefa) {
  const card = document.createElement("article");

  card.className = "card";

  card.draggable = true;

  card.dataset.id = tarefa.id;

  card.dataset.status = tarefa.status;

  card.innerHTML = `
<div class="card-header">

<span class="card-tag">
${tarefa.tag}
</span>

<div class="card-actions">

<button
class="card-btn"
onclick="editarTarefa(${tarefa.id})">

✎

</button>

<button
class="card-btn card-btn-danger"
onclick="removerTarefa(${tarefa.id})">

✕

</button>

</div>

</div>

<h3 class="card-title">
${tarefa.titulo}
</h3>

<p class="card-desc">
${tarefa.descricao}
</p>

<div class="card-footer">

<time>
${tarefa.data}
</time>

</div>
`;

  card.addEventListener("dragstart", arrastarTarefa);

  document.getElementById(`col-${tarefa.status}`).appendChild(card);
}

function removerTarefa(id) {
  const card = document.querySelector(`[data-id="${id}"]`);

  if (card) {
    card.remove();

    atualizarContadores();

    atualizarProgresso();
  }
}

function editarTarefa(id) {
  alert(`Editar tarefa ${id}`);
}

function arrastarTarefa(event) {
  event.dataTransfer.setData("text", event.target.dataset.id);
}

function soltarTarefa(event, novoStatus) {
  event.preventDefault();

  const id = event.dataTransfer.getData("text");

  const card = document.querySelector(`[data-id="${id}"]`);

  if (card) {
    card.dataset.status = novoStatus;

    document.getElementById(`col-${novoStatus}`).appendChild(card);

    atualizarContadores();

    atualizarProgresso();
  }
}

function permitirDrop(event) {
  event.preventDefault();
}

// ======================================
// PROGRESSO
// ======================================

function atualizarContadores() {
  ["afazer", "fazendo", "concluido"].forEach((status) => {
    document.getElementById(`count-${status}`).textContent =
      document.querySelectorAll(`.card[data-status="${status}"]`).length;
  });
}

function atualizarProgresso() {
  const total = document.querySelectorAll(".card").length;

  const concluidas = document.querySelectorAll(
    '.card[data-status="concluido"]'
  ).length;

  const percentual = total ? Math.round((concluidas / total) * 100) : 0;

  document.getElementById("progress-fill").style.width = `${percentual}%`;

  document.getElementById("progress-label").textContent = `${percentual}%`;
}

// ======================================
// TEMA
// ======================================

function trocarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);

  localStorage.setItem("tema", tema);

  document
    .querySelectorAll(".theme-btn")
    .forEach((btn) => btn.classList.remove("active"));

  const ativo = document.querySelector(`[data-theme="${tema}"]`);

  if (ativo) ativo.classList.add("active");
}

function alternarTema() {
  const atual = document.documentElement.getAttribute("data-theme");

  trocarTema(atual === "dark" ? "light" : "dark");
}

// ======================================
// INICIALIZAÇÃO
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  verificarLogin();

  atualizarDisplay();

  atualizarContadores();

  atualizarProgresso();

  trocarTema(localStorage.getItem("tema") || "dark");
});