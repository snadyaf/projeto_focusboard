// =======================
// LOCAL STORAGE - TAREFAS
// =======================

function salvarNoStorage() {
  const tarefas = [];

  document.querySelectorAll(".card").forEach((card) => {
    tarefas.push({
      id: card.dataset.id,
      status: card.dataset.status,

      titulo: card.querySelector(".card-title")?.textContent,

      descricao: card.querySelector(".card-desc")?.textContent,

      categoria: card
        .querySelector(".card-tag")
        ?.textContent.trim()
        .toLowerCase(),

      data: card.querySelector("time")?.getAttribute("datetime"),
    });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefasStorage() {
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));

  if (!tarefasSalvas) return;

  // limpa array atual
  tarefas.length = 0;

  // limpa colunas
  document.getElementById("col-afazer").innerHTML = "";
  document.getElementById("col-fazendo").innerHTML = "";
  document.getElementById("col-concluido").innerHTML = "";

  tarefasSalvas.forEach((tarefa) => {
    // mantém no array principal
    tarefas.push({
      id: Number(tarefa.id),
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      data: tarefa.data,
      status: tarefa.status,
      tag: tarefa.categoria,
    });

    // usa a mesma renderização
    renderizarTarefa({
      id: Number(tarefa.id),
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      data: tarefa.data,
      status: tarefa.status,
      tag: tarefa.categoria,
    });
  });

  atualizarContadores();
  atualizarProgresso();
}

// ======================================
// LOGIN
// ======================================

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
    minutos,
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
let tarefaEditando = null;

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

  if (tarefaEditando !== null) {
    // procura a tarefa dentro do array
    const tarefaExistente = tarefas.find(
      (tarefa) => tarefa.id === tarefaEditando,
    );

    // atualiza os dados
    tarefaExistente.titulo = document.getElementById(
      "modal-tarefa-titulo",
    ).value;

    tarefaExistente.descricao =
      document.getElementById("modal-tarefa-desc").value;

    tarefaExistente.data = document.getElementById("modal-tarefa-data").value;

    tarefaExistente.status = document.getElementById(
      "modal-tarefa-status",
    ).value;

    tarefaExistente.tag = document.getElementById("modal-tarefa-tag").value;

    // encontra o card antigo na tela
    const cardAntigo = document.querySelector(`[data-id="${tarefaEditando}"]`);

    // remove o card antigo
    if (cardAntigo) {
      cardAntigo.remove();
    }

    // desenha novamente o card atualizado
    renderizarTarefa(tarefaExistente);

    // encerra modo edição
    tarefaEditando = null;
  } else {
    tarefas.push(tarefa);

    renderizarTarefa(tarefa);
  }

  atualizarContadores();

  atualizarProgresso();

  limparFormulario();

  fecharModalNovaTarefa();

  salvarNoStorage();

  fecharModal();
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

<span class="card-tag tag-${tarefa.tag.toLowerCase()}">
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

<span class="card-date">

${tarefa.status === "concluido" ? "✔" : "📅"}

<time datetime="${tarefa.data}">
${tarefa.data}
</time>

</span>

</div>
`;

  if (tarefa.status === "concluido") {
    card.classList.add("card-concluido");
  }

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
  const tarefa = tarefas.find((tarefa) => tarefa.id === id);
  document.getElementById("modal-tarefa-titulo").value = tarefa.titulo;
  document.getElementById("modal-tarefa-desc").value = tarefa.descricao;
  document.getElementById("modal-tarefa-data").value = tarefa.data;
  document.getElementById("modal-tarefa-status").value = tarefa.status;
  document.getElementById("modal-tarefa-tag").value = tarefa.tag;

  abrirModalNovaTarefa();

  tarefaEditando = tarefa.id;
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

    // aplica/remover efeito concluído
    if (novoStatus === "concluido") {
      card.classList.add("card-concluido");
    } else {
      card.classList.remove("card-concluido");
    }

    // atualiza array
    const tarefa = tarefas.find((t) => t.id == id);

    if (tarefa) {
      tarefa.status = novoStatus;
    }

    document.getElementById(`col-${novoStatus}`).appendChild(card);

    atualizarContadores();

    atualizarProgresso();

    salvarNoStorage();
  }
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
    '.card[data-status="concluido"]',
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
  atualizarDisplay();

  atualizarContadores();

  atualizarProgresso();

  trocarTema(localStorage.getItem("tema") || "dark");
});

function fazerLogout() {
  const app = document.getElementById("app");
  const login = document.getElementById("login-screen");
  app.classList.add("hidden");
  login.classList.remove("hidden");

  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";

  localStorage.clear();

  sessionStorage.clear();

  location.reload();
}
function alternarSidebar() {
  const sidebar = document.querySelector(".sidebar");

  if (window.innerWidth <= 768) {
    sidebar.classList.toggle("aberta");
  } else {
    sidebar.classList.toggle("sidebar-fechada");
  }
}

function fecharModal() {
  const modal = document.getElementById("modal-tarefa");

  modal.classList.add("hidden");

  // limpar campos do formulário
  document.getElementById("modal-tarefa-titulo").value = "";
  document.getElementById("modal-tarefa-desc").value = "";
  document.getElementById("modal-tarefa-data").value = "";
  document.getElementById("modal-tarefa-status").value = "afazer";
  document.getElementById("modal-tarefa-tag").value = "frontend";
}

function filtrarTarefas() {
  const texto = document.getElementById("pesquisa-tarefa").value.toLowerCase();

  const status = document.getElementById("filtro-status").value;

  document.querySelectorAll(".kanban-col").forEach((coluna) => {
    const statusColuna = coluna.dataset.status;

    const statusOk = status === "todos" || status === statusColuna;

    let existeCard = false;

    coluna.querySelectorAll(".card").forEach((card) => {
      const conteudo = card.innerText.toLowerCase();

      const textoOk = conteudo.includes(texto);

      const mostrar = statusOk && textoOk;

      card.style.display = mostrar ? "" : "none";

      if (mostrar) existeCard = true;
    });

    coluna.style.display = existeCard ? "" : "none";
  });
}

window.addEventListener("DOMContentLoaded", () => {
  carregarTarefasStorage();
});
