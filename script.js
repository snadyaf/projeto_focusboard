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

// Mapeia o onclick="fecharModal()" presente no HTML original para a fecharModalNovaTarefa
function fecharModal() {
  fecharModalNovaTarefa();
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
  
  // Sincroniza dinamicamente o Dashboard e guarda no LocalStorage
  atualizarDashboard();
  salvarTarefasNoLocalStorage();

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

    // Atualiza o painel estatístico e limpa do armazenamento local
    atualizarDashboard();
    salvarTarefasNoLocalStorage();
  }
}

function editarTarefa(id) {
  alert(`Editar tarefa ${id}`);
}

function arrastarTarefa(event) {
  event.dataTransfer.setData("text", event.target.dataset.id);
}

// Responde ao evento drop do Kanban atualizando a aba correspondente
function soltarTarefa(event, novoStatus) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const card = document.querySelector(`[data-id="${id}"]`);

  if (card) {
    card.dataset.status = novoStatus;
    document.getElementById(`col-${novoStatus}`).appendChild(card);

    atualizarContadores();
    atualizarProgresso();

    // Quando mover uma tarefa, recalcula os valores gráficos e preserva no disco local
    atualizarDashboard();
    salvarTarefasNoLocalStorage();
  }
}

function permitirDrop(event) {
  event.preventDefault();
}


// ======================================
// REQUISITOS ADICIONAIS: DASHBOARD & LOCALSTORAGE 
// ======================================

// 1. ATUALIZAÇÃO AUTOMÁTICA DA DISTRIBUIÇÃO DAS TAREFAS NA ABA DASHBOARD
function atualizarDashboard() {
  const total = document.querySelectorAll(".card").length;
  const afazer = document.querySelectorAll('.card[data-status="afazer"]').length;
  const fazendo = document.querySelectorAll('.card[data-status="fazendo"]').length;
  const concluido = document.querySelectorAll('.card[data-status="concluido"]').length;

  // Atualiza os painéis numéricos superiores
  if (document.getElementById("stat-total")) document.getElementById("stat-total").textContent = total;
  if (document.getElementById("stat-afazer")) document.getElementById("stat-afazer").textContent = afazer;
  if (document.getElementById("stat-fazendo")) document.getElementById("stat-fazendo").textContent = fazendo;
  if (document.getElementById("stat-concluido")) document.getElementById("stat-concluido").textContent = concluido;

  // Atualiza a altura das colunas no gráfico estatístico (CSS Integrado)
  const pctAfazer = total ? (afazer / total) * 100 : 0;
  const pctFazendo = total ? (fazendo / total) * 100 : 0;
  const pctConcluido = total ? (concluido / total) * 100 : 0;

  if (document.getElementById("bar-val-afazer")) document.getElementById("bar-val-afazer").textContent = afazer;
  if (document.getElementById("bar-afazer")) document.getElementById("bar-afazer").style.height = `${pctAfazer}%`;

  if (document.getElementById("bar-val-fazendo")) document.getElementById("bar-val-fazendo").textContent = fazendo;
  if (document.getElementById("bar-fazendo")) document.getElementById("bar-fazendo").style.height = `${pctFazendo}%`;

  if (document.getElementById("bar-val-concluido")) document.getElementById("bar-val-concluido").textContent = concluido;
  if (document.getElementById("bar-concluido")) document.getElementById("bar-concluido").style.height = `${pctConcluido}%`;

  // Atualiza o rodapé descritivo
  if (document.getElementById("resumo-concluidas")) document.getElementById("resumo-concluidas").textContent = concluido;
}

// 2. PERSISTÊNCIA VIA LOCALSTORAGE (SAIR DA CONTA OU FECHAR ABA)
function salvarTarefasNoLocalStorage() {
  const todasAsTarefas = [];
  document.querySelectorAll(".card").forEach((card) => {
    todasAsTarefas.push({
      id: card.dataset.id,
      status: card.dataset.status,
      tag: card.querySelector(".card-tag") ? card.querySelector(".card-tag").textContent.trim() : "",
      titulo: card.querySelector(".card-title") ? card.querySelector(".card-title").textContent.trim() : "",
      descricao: card.querySelector(".card-desc") ? card.querySelector(".card-desc").textContent.trim() : "",
      data: card.querySelector("time") ? card.querySelector("time").textContent.trim() : "",
    });
  });
  localStorage.setItem("focusTarefas", JSON.stringify(todasAsTarefas));
}

function carregarTarefasDoLocalStorage() {
  const tarefasSalvas = localStorage.getItem("focusTarefas");
  
  if (tarefasSalvas) {
    const arrayDeTarefas = JSON.parse(tarefasSalvas);
    
    // Esvazia as colunas padrões do HTML para renderizar os dados armazenados
    document.getElementById("col-afazer").innerHTML = "";
    document.getElementById("col-fazendo").innerHTML = "";
    document.getElementById("col-concluido").innerHTML = "";
    
    arrayDeTarefas.forEach((tarefa) => renderizarTarefa(tarefa));
  } else {
    // Se for a primeira visita do usuário, indexa as tarefas demonstrativas que vieram por padrão no HTML
    salvarTarefasNoLocalStorage();
  }
}

// Monitorização complementar para a persistência das anotações
function contarCaracteres() {
  const campo = document.getElementById("notes-area");
  if (campo) {
    document.getElementById("char-count").textContent = campo.value.length;
    document.getElementById("save-indicator").innerHTML = `<span aria-hidden="true">○</span> Não salvo`;
  }
}

function salvarAnotacao() {
  const campo = document.getElementById("notes-area");
  if (campo) {
    localStorage.setItem("focusAnotacao", campo.value);
    document.getElementById("save-indicator").innerHTML = `<span aria-hidden="true">✓</span> Salvo`;
  }
}

function carregarAnotacao() {
  const campo = document.getElementById("notes-area");
  const anotacaoSalva = localStorage.getItem("focusAnotacao");
  if (campo && anotacaoSalva) {
    campo.value = anotacaoSalva;
    contarCaracteres();
    document.getElementById("save-indicator").innerHTML = `<span aria-hidden="true">✓</span> Salvo`;
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
  const concluidas = document.querySelectorAll('.card[data-status="concluido"]').length;
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
// INICIALIZAÇÃO DA APLICAÇÃO
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  verificarLogin();

  // Recupera as informações persistidas ao iniciar
  carregarTarefasDoLocalStorage();
  carregarAnotacao();

  atualizarDisplay();
  atualizarContadores();
  atualizarProgresso();
  
  // Realiza o primeiro mapeamento do Dashboard em sincronia completa
  atualizarDashboard();

  trocarTema(localStorage.getItem("tema") || "dark");
});